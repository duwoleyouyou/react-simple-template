import React from "react";
import styles from "./index.less";
import { RootState } from "@/store/index";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "@/pages/App/appSlice";
import { Button } from "antd";

const Questions = (props: any) => {
  const value = useSelector((state: RootState) => state.App.value);
  const dispatch = useDispatch();

  return (
    <>
      value:{value}
      <Button onClick={() => dispatch(increment())}>increment value</Button>
      <Button onClick={() => dispatch(decrement())}>decrement value</Button>
      <Button onClick={() => props.history.push("/")}>to App page</Button>
    </>
  );
};

export default Questions;
