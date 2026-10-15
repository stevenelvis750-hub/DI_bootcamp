import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";
import { fetchUser } from "./userthunks";

const makeStore = () => configureStore({ reducer: { user: userReducer } });

describe("fetchUser thunk", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("stores user data on success", async () => {
    const mockUser = { id: 1, name: "Leanne Graham" };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockUser,
    });

    const store = makeStore();
    await store.dispatch(fetchUser(1));

    const state = store.getState().user;
    expect(state.data).toEqual(mockUser);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("stores an error message on failure", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 });

    const store = makeStore();
    await store.dispatch(fetchUser(1));

    const state = store.getState().user;
    expect(state.error).toBe("Request failed with status 500");
    expect(state.loading).toBe(false);
  });

  it("handles a network error", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network down"));

    const store = makeStore();
    await store.dispatch(fetchUser(1));

    expect(store.getState().user.error).toBe("Network down");
  });
});