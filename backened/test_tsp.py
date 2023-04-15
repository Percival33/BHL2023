import numpy as np
from python_tsp.exact import solve_tsp_dynamic_programming

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
        distance_matrix[key][d]

permutation, distance = solve_tsp_dynamic_programming(distance_matrix)
print(permutation, distance)