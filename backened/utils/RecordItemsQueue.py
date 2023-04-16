from models import Order, OrderItem

ASSIGN_BORDER = 1

class RecordItemsQueue:
    def __init__(self):
        self.items_store = {}
        self.total_count = 0

    def inject_order(self, order: Order):
        for item in order['order_items']:
            count = self.items_store.get(item['product_type_id'], 0)
            self.items_store[item['product_type_id']] = count+item['qty']
            self.total_count += item['qty']

    def is_enough_to_assign(self):
        return self.total_count >= ASSIGN_BORDER

    def get_batch(self):
        assigned = 0
        assigned_items = []
        given = 0
        for product_type_id, qty in self.items_store.items():
            if ASSIGN_BORDER - assigned < qty:
                given = ASSIGN_BORDER-assigned
            else:
                given = qty
            assigned += given
            assigned_items.append(
                OrderItem(**{
                    'product_type_id': product_type_id,
                    'qty': given
                })
            )
            self.items_store[product_type_id] -= given
            self.total_count -= given
            if assigned >= ASSIGN_BORDER: break
        return assigned_items
