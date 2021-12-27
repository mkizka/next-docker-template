import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

type Success<T> = {
  state: "success";
  message: string;
  data: T;
};

type Error = {
  state: "error";
  message: string;
};

export type Response<T = {}> = Success<T> | Error;

export const handler = <T = {}>() =>
  nc<NextApiRequest, NextApiResponse<Response<T>>>({
    onError(error: Error, _, res) {
      res.status(501);
      res.json({
        state: "error",
        message: "予期せぬエラーが発生しました",
      });
      console.error(error);
    },
    onNoMatch(req, res) {
      res.status(405);
      res.json({
        state: "error",
        message: `${req.url}への${req.method}メソッドは許可されていません`,
      });
    },
  });
