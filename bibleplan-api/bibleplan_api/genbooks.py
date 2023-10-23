import hashlib
import os
from collections import UserList
from typing import Any, Dict, List, Tuple

import numpy


class Chunk(UserList):
    threshold: float
    sum = property(lambda self: sum(self))
    max = property(lambda self: max(self))
    min = property(lambda self: min(self))
    key = property(lambda self: "-".join([str(s) for s in self]))

    delta = property(lambda self: self.sum - self.threshold)
    delta_left = property(lambda self: abs(sum(self[1:]) - self.threshold))
    delta_right = property(lambda self: abs(sum(self[:-1]) - self.threshold))


def shift_to(arr: list[numpy.ndarray[Any, Any]], idx: int):
    removed = arr[idx][0]
    arr[idx] = arr[idx][1:]
    arr[idx + 1] = numpy.append(arr[idx + 1], removed)


def pop_to(arr: list[numpy.ndarray[Any, Any]], idx: int):
    removed = arr[idx][-1]
    arr[idx] = arr[idx][:-1]
    arr[idx + 1] = numpy.append([removed], arr[idx + 1])


def solver(
    arrs: list[Any], target: float, direction: str, goal: float = 0
) -> list[numpy.ndarray[Any, Any]]:
    iteration = 0
    last_key = ""
    cur_iter: list[numpy.ndarray[Any, Any]]
    while iteration < 1000:
        key, arrs = distribute(arrs, target, direction, goal)
        if last_key == key:
            break
        last_key = key
        cur_iter = arrs
        iteration += 1
    return cur_iter


def bin_weights(weights: list[int], num_bins: int) -> list[numpy.ndarray[Any, Any]]:
    target = sum(weights) / float(num_bins)
    a_weights = numpy.array(weights)
    arrs = [arr for arr in numpy.array_split(a_weights, num_bins)]
    arrs = solver(arrs, target, direction="right", goal=0)
    arrs.reverse()
    arrs = solver(arrs, target, direction="left", goal=0.3 * target)
    arrs.reverse()
    return arrs


def distribute(
    arrs: list[numpy.ndarray[Any, Any]], target: float, direction: str, goal: float = 0
) -> Tuple[str, list[numpy.ndarray[Any, Any]]]:
    funcs = {
        "left": shift_to,
        "right": pop_to,
    }
    for idx, arr in enumerate(arrs):
        chunk = Chunk(arr)
        chunk.threshold = target
        # If the current gap between average words too high.
        # Also, we only deal with positive numbers instead of
        # stealing from neighbors if we were < goal.
        if chunk.delta > goal:
            direction_delta = getattr(chunk, f"delta_{direction}")
            # If shifting over to the next day would be better than we are
            # currently. Really large items can make the results swing.
            if direction_delta < chunk.delta:
                # We exclude last array items since we are purposefully filling it.
                if idx != len(arrs) - 1:
                    funcs[direction](arrs, idx)
    key = ":".join([Chunk(arr).key for arr in arrs])
    return hashlib.md5(key.encode("utf-8")).hexdigest(), arrs


def test_it(og_vals, solved):
    baddies = 0
    accum = []
    for pd in solved:
        for d in pd:
            accum.append(d)
        chunk = Chunk(pd)
        target = sum(og_vals) / float(365)
        difference = chunk.sum - target
        if abs(difference) > 0.25 * target:
            baddies += 1
            ratio = (difference / target) * 100
            print(f"{chunk.sum}: {ratio}")
    print(baddies)
    og = ":".join([str(v) for v in og_vals])
    ng = ":".join([str(v) for v in accum])
    print(og == ng)


def read_file(filename):
    srcdir = "sources"
    text = open(f"{srcdir}{os.path.sep}{filename}", "r")
    lines = text.readlines()
    # Title line gotta get removed
    lines.pop(0)
    text.close()
    return lines

def parse_file(lines):
    sections = {}
    books = []
    for line in lines:
        line = line.strip()
        words = line.split(",")
        bookname = words[0]
        chapternum = words[1]
        wordcount = words[3]
        sections[f"{bookname} {chapternum}"] = int(wordcount)
        books.append(f"{bookname} {chapternum}")
    return {"books": books, "chapters": sections}



def get_66():
    lines = read_file("esv_chapters.csv")
    return parse_file(lines)

def get_apocrypha():
    lines = read_file("nrsv_apocrypha_chapters.csv")
    return parse_file(lines)


def make_chapters(part_vals, chapter_map):
    progress = []
    chapter_map_idx = 0
    cur_chapter = 1
    chapters = []
    for part in part_vals:
        part_end = len(part)
        parts = []
        part_total = 0
        for p in part:
            part_total += p
        progress.append(part_total)
        for _ in range(cur_chapter, cur_chapter + part_end):
            parts.append(f"{chapter_map[chapter_map_idx]}")
            chapter_map_idx += 1
        cur_chapter += part_end
        chapters.append(parts)
    return chapters


def format_chapters(plan):
    formatted = []
    for chapters in plan:
        books = []
        book_data = {}
        for chapter in chapters:
            parts = chapter.split(" ")
            chapter_num = parts[-1]
            book_name = " ".join(parts[:-1])
            if book_name not in books:
                books.append(book_name)
                book_data[book_name] = []
            book_data[book_name].append(chapter_num)
        day_readings = []
        for book in books:
            chapter_fmt = f"{book_data[book][0]}"
            if len(book_data[book]) != 1:
                chapter_fmt = f"{chapter_fmt}-{book_data[book][-1]}"
            day_readings.append(f"{book} {chapter_fmt}")
        formatted.append(day_readings)
    return ["; ".join(f) for f in formatted]


book_dict: Dict[str, int] = {}
book_list: List[str] = []
booklist_funcs = [get_66, get_apocrypha]
for func in booklist_funcs:
    dataset = func()
    book_list.extend(dataset["books"])
    for key in dataset["chapters"].keys():
        book_dict[key] = dataset["chapters"][key]

book_names = []
for book in book_list:
    book_parts = book.split(' ')[:-1]
    book_name = ' '.join(book_parts)
    if book_name not in book_names:
        book_names.append(book_name)
print(book_names)

def gen_plan():
    raw_vals = list(book_dict.values())
    plan_data = bin_weights(raw_vals, 365)
    chapters = make_chapters(plan_data, book_list)
    # print(chapters)
    chapters = format_chapters(chapters)
    print(chapters)

# test_it(raw_vals, plan_data)


# weights = [numpy.random.randint(2000) for _ in range(200)]
# days = 15
# plan = bin_weights(weights, days)
# print(plan)
# test_it(weights, plan)
