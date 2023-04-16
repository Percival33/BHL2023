from scipy.sparse import csr_matrix
from scipy.sparse.csgraph import floyd_warshall
from itertools import permutations
import numpy as np

from models import RecordItem

magazine = {
    1: {
        1: 1,
        2: 2
    },
    2: {
        1: 3,
        2: 4,
    },
    3: {
        1: 5,
        2: 6
    },
    4: {
        1: 7,
        2: 8
    }
}

magazine_rev = {
    1: (1, 1),
    2: (1, 2),
    3: (2, 1),
    4: (2, 2),
    5: (3, 1),
    6: (3, 2),
    7: (4, 1),
    8: (4, 2)
}

graph = {
    0: [(2, 2), (3, 2), (6, 5), (7, 5)],
    1: [(2, 1)],
    2: [(3, 1), (6, 3), (7, 4)],
    3: [(6, 4), (7, 3)],
    4: [(3, 1)],
    5: [(6, 1)],
    6: [(7, 1)],
    7: [(8, 1)],
    8: []
}

distance_matrix = np.zeros((9, 9))
for key, item in graph.items():
    for n, d in item:
        distance_matrix[key, n] = d
        distance_matrix[n, key] = d

path = [8, 2, 5]

dist_matrix, pre = floyd_warshall(csgraph=csr_matrix(distance_matrix), directed=False, return_predecessors=True)


class PathManager:
    def __init__(self):
        self.distance_matrix = dist_matrix

    def _to_flat(self, record_items: list[RecordItem]):
        coordinates = {}
        for item in record_items:
            coor = (item.regal, item.column)
            l = coordinates.get(coor, [])
            l.append(item)
            coordinates[coor] = l
        return [magazine[x][y] for x, y in coordinates.keys()], coordinates

    def get_optimal_route(self, record_items: list[RecordItem]):
        print(self._to_flat(record_items))
        coors, agreg = self._to_flat(record_items)
        best_route = []
        dist = float("inf")
        for possibility in permutations(coors):
            possibility = list([0, *possibility, 0])
            prev = possibility[0]
            d = 0
            for n in possibility[1:]:
                d += dist_matrix[prev, n]
                prev = n
            if d < dist:
                best_route = possibility
                dist = d
        res = []
        for node in best_route[1:-1]:
            res.extend(agreg[magazine_rev[node]])
        return res
