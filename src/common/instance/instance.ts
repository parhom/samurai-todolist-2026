import axios from "axios"

const token = "xxx"
const apiKey = "xxx"

export const instance = axios.create({
	baseURL: "https://trelly.it-incubator.app/api/1.0",
	headers: {
		Authorization: `Bearer ${token}`,
		"api-key": apiKey,
	},
})