import {Test} from "@interfaces/test.ts";
import {apiClient} from "./apiClient.ts";

export const testApi = {
    get: async (): Promise<Blob> => {
        const response = await apiClient.get<Blob>("/test", {responseType: "blob"})
        return response.data;
        //return new File([response.data], response.headers["content-disposition"].split("filename=")[1]);
    },

    update: async (formValues: Test): Promise<void> => {
        return await apiClient.put("/test", formValues)
    },

    create: async (formValues: Test): Promise<void> => {
        return await apiClient.post("/test", formValues)
    }
}