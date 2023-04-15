from pydantic import BaseModel


class UserModel(BaseModel):
    name: str
    lastName: str