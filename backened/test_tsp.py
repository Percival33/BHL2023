import numpy as np
from python_tsp.exact import solve_tsp_dynamic_programming
from dijkstar import Graph, find_path
from scipy.sparse import csr_matrix
from scipy.sparse.csgraph import floyd_warshall
from itertools import permutations
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
best_route = []
dist = float("inf")
for p in permutations(path):
    p = list([0, *p, 0])
    prev = p[0]
    d = 0
    for n in p[1:]:
        d += dist_matrix[prev, n]
        prev = n
    if d < dist:
        best_route = p
        dist = d


a = [((1, 2), [1]), ((2, 3), [3])]
c, d = list(zip(*a))
print(c)
print(d)