from zenml import (
    pipeline,
    step,
)
from typing import Tuple, Dict
from typing_extensions import Annotated


@step
def dict_producer() -> Dict[str, str]:
    return {"key": "value"}


@step(substitutions={"sub": "julian"})
def producer() -> Tuple[Annotated[int, "{sub}_{time}"], int]:
    return 0, 0

@step()
def consumer(input_0: int, input_1: int) -> None:
    pass


@pipeline(enable_cache=False)
def p() -> None:
    dict_producer()
    consumer(*producer())


if __name__ == "__main__":
    p()
