import {apiClient} from "./apiClient.ts";
import {Test} from "../types/test.ts";

export const testApi = {
    getTestObject: async () => {
        const response = await apiClient.get<Test>("/stena/api/test")
        return response.data;
    }
}