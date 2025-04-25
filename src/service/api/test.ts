
import service from "../index";


export function getTest(params: unknown) {
  return service({
    url: "/api/test",
    method: "get",
    params: { word: "hello" },
  });
}
export function postTest(params: unknown) {
  return service({
    url: "/api/test",
    method: "post",
    data: { word: "hello" },
  });
}