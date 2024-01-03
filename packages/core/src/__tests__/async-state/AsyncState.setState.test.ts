import { AsyncState, createSource } from "../..";
import { timeout } from "./test-utils";
import { mockDateNow, TESTS_TS } from "../utils/setup";
import { pending } from "../../enums";
import { replaceInstanceState } from "../../modules/StateUpdate";

// @ts-ignore
jest.useFakeTimers("modern");
mockDateNow();

describe("AsyncState - setState", () => {
  // given
  let key = "simulated";
  let producer = timeout(100, [{ id: 1, description: "value" }]);
  let myConfig = { initialValue: null };
  jest.spyOn(Date, "now").mockImplementation(() => TESTS_TS);
  let myAsyncState = new AsyncState(key, producer, myConfig);
  let subscription = jest.fn();
  myAsyncState.actions.subscribe({ cb: subscription });

  beforeEach(() => {
    subscription.mockClear();
  });
  it("should perform correct typing on setState", () => {
    class CustomError extends Error {
      readonly id: number;
      constructor(id: number) {
        super();
        this.id = id;
      }
    }
    let source = createSource<number, never, CustomError>("test", null, {
      initialValue: 0,
    });

    source.setState(5);
    source.setState(() => 6);
    source.setState(5, "success");
    source.setState(() => 6, "success");

    source.setState(5, "initial");
    source.setState(() => 7, "initial");

    source.setState(null, "pending");
    source.setState(new CustomError(1), "error");

    // @ts-expect-error
    source.setState(null, "error");
    // @ts-expect-error
    source.setState(new Error(), "error");
    // @ts-expect-error
    source.setState(null, "success");
    // @ts-expect-error
    source.setState(new Error(), "success");
    // @ts-expect-error
    source.setState(new Error(), "initial");
    // @ts-expect-error
    source.setState(new Error(), "pending");
    // @ts-expect-error
    source.setState(3, "pending");
  });

  it("should synchronously mutate the state after setState call and notify subscribers", () => {
    // when
    let current = myAsyncState.state;
    if (current.status === pending) {
      current = current.prev;
    }
    replaceInstanceState(myAsyncState, {
      status: "pending",
      data: null,
      timestamp: Date.now(),
      prev: current,
      props: { args: [], payload: {} },
    });
    // then
    let expectedState = {
      props: { args: [], payload: {} },
      data: null,
      prev: {
        data: null,
        props: {
          args: [null],
          payload: {},
        },
        status: "initial",
        timestamp: TESTS_TS,
      },
      timestamp: TESTS_TS,
      status: "pending",
    };
    expect(myAsyncState.state).toEqual(expectedState);

    expect(subscription).toHaveBeenCalledTimes(1);
    expect(subscription).toHaveBeenCalledWith(expectedState);
  });
  it("should update state and do not notify subscribers", async () => {
    let lastSuccess = myAsyncState.lastSuccess;

    replaceInstanceState(
      myAsyncState,
      {
        status: "success",
        data: {},
        props: { args: [], payload: {} },
        timestamp: Date.now(),
      },
      false
    );
    // then
    expect(subscription).not.toHaveBeenCalled();
  });
});
