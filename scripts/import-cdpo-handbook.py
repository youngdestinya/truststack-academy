"""Convert the supplied CDPO DOCX into ordered, renderable lesson data.

Usage: python scripts/import-cdpo-handbook.py path/to/handbook.docx
"""

import json
import re
import sys
from pathlib import Path

from docx import Document
from docx.oxml.ns import qn
from docx.table import Table
from docx.text.paragraph import Paragraph


def blocks(document):
    for element in document.element.body.iterchildren():
        if element.tag == qn('w:p'):
            paragraph = Paragraph(element, document)
            value = paragraph.text.strip()
            if value:
                yield {'type': 'text', 'style': paragraph.style.name, 'text': value}
        elif element.tag == qn('w:tbl'):
            table = Table(element, document)
            rows = [[cell.text.strip() for cell in row.cells] for row in table.rows]
            if any(any(cell for cell in row) for row in rows):
                yield {'type': 'table', 'rows': rows}


def main(source):
    document = Document(source)
    destination = Path(__file__).resolve().parents[1] / 'data' / 'cdpo'
    destination.mkdir(parents=True, exist_ok=True)
    sections = {'intro': {'title': 'How to Use This Handbook', 'blocks': []}}
    current = sections['intro']
    started = False
    for block in blocks(document):
        if not started:
            if block['type'] == 'text' and block['style'] == 'Title' and block['text'] == 'How to Use This Handbook':
                started = True
            continue
        if block['type'] == 'text' and block['style'] == 'Title':
            title = block['text']
            match = re.fullmatch(r'Day (\d+): (.+)', title)
            if match:
                key = str(int(match.group(1)))
                current = sections[key] = {'day': int(key), 'title': match.group(2), 'blocks': []}
                continue
            if title == 'Final Mock CDPO Examination':
                current = sections['exam'] = {'title': title, 'blocks': []}
                continue
            if title == 'Source Register':
                current = sections['sources'] = {'title': title, 'blocks': []}
                continue
            if current is sections['intro'] and title in ('Complete 30-Day Roadmap', 'Table of Contents'):
                current['blocks'].append({'type': 'text', 'style': 'Heading 1', 'text': title})
                continue
        current['blocks'].append(block)
    assert all(str(day) in sections for day in range(1, 31)), 'Expected all 30 study days'
    for key, value in sections.items():
        (destination / f'{key}.json').write_text(json.dumps(value, ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf-8')
    index = [{'day': day, 'title': sections[str(day)]['title']} for day in range(1, 31)]
    (destination / 'index.json').write_text(json.dumps(index, ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf-8')
    print(f'Imported {len(index)} study days and {sum(len(section["blocks"]) for section in sections.values())} ordered blocks')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        raise SystemExit('Pass the handbook DOCX path')
    main(Path(sys.argv[1]))
