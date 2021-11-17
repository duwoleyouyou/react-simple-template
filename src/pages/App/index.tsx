import React from "react";
import { RootState } from "@/store/index";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./appSlice";
import { Button } from "antd";

export default (props: any) => {
  const value = useSelector((state: RootState) => state.App.value);
  const dispatch = useDispatch();

  return (
    <>
      <h1>this is app...</h1>
      value:{value}
      <Button onClick={() => dispatch(increment())}>increment value</Button>
      <Button onClick={() => dispatch(decrement())}>decrement value</Button>
      <p>
        <Button onClick={() => props.history.push("/questions")}>
          to questions page
        </Button>
      </p>
    </>
  );
};
