from typing import Annotated, Tuple
from zenml import pipeline, step


@step
def step_1() -> Tuple[int, Annotated[int, "custom_artifact_name"]]:
    return 0, 1


@step
def step_2(input_0: int) -> None:
    pass


@pipeline(enable_cache=False)
def ui_test_pipeline():
    output_0, _ = step_1()
    step_2(output_0)


if __name__ == "__main__":
    ui_test_pipeline()
