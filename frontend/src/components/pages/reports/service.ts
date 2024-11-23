import axios from "axios";
import { FollowData } from "../../../@types";

export async function getAllFollows() {
  const url = `http://localhost:3002/api/follows/`;

  const result = await axios.get<{ follows: FollowData[] }>(url);

  if (result.status !== 200) {
    throw new Error("Failed to toggle follow vacation");
  }

  return result.data.follows;
}
