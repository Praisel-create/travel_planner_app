import { create } from "zustand";

const useUserStore = create((set) => ({
    userName: "", //inital state of the username field before the user inputs their username
    setUserName: (name) => set({userName: name})
})
);

export default useUserStore;