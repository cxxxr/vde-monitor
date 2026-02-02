// @vitest-environment happy-dom
import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useSessionControls } from "./useSessionControls";

describe("useSessionControls", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("sends text with auto-enter toggle and clears input", async () => {
    const sendText = vi.fn().mockResolvedValue({ ok: true });
    const sendKeys = vi.fn().mockResolvedValue({ ok: true });
    const setScreenError = vi.fn();
    const scrollToBottom = vi.fn();

    const { result } = renderHook(() =>
      useSessionControls({
        paneId: "pane-1",
        readOnly: false,
        mode: "text",
        sendText,
        sendKeys,
        setScreenError,
        scrollToBottom,
      }),
    );

    const textarea = document.createElement("textarea");
    textarea.value = "echo hello";

    act(() => {
      result.current.textInputRef.current = textarea;
      result.current.toggleAutoEnter();
    });

    await act(async () => {
      await result.current.handleSendText();
    });

    expect(sendText).toHaveBeenCalledWith("pane-1", "echo hello", false);
    expect(textarea.value).toBe("");
    expect(scrollToBottom).toHaveBeenCalledWith("auto");
  });

  it("blocks dangerous text when confirmation is canceled", async () => {
    const confirmSpy = vi.fn(() => false);
    vi.stubGlobal("confirm", confirmSpy);

    const sendText = vi.fn().mockResolvedValue({ ok: true });
    const sendKeys = vi.fn().mockResolvedValue({ ok: true });
    const setScreenError = vi.fn();
    const scrollToBottom = vi.fn();

    const { result } = renderHook(() =>
      useSessionControls({
        paneId: "pane-1",
        readOnly: false,
        mode: "text",
        sendText,
        sendKeys,
        setScreenError,
        scrollToBottom,
      }),
    );

    const textarea = document.createElement("textarea");
    textarea.value = "rm -rf /";

    act(() => {
      result.current.textInputRef.current = textarea;
    });

    await act(async () => {
      await result.current.handleSendText();
    });

    expect(confirmSpy).toHaveBeenCalled();
    expect(sendText).not.toHaveBeenCalled();
  });

  it("maps modifier keys before sending", async () => {
    const sendText = vi.fn().mockResolvedValue({ ok: true });
    const sendKeys = vi.fn().mockResolvedValue({ ok: true });
    const setScreenError = vi.fn();
    const scrollToBottom = vi.fn();

    const { result } = renderHook(() =>
      useSessionControls({
        paneId: "pane-1",
        readOnly: false,
        mode: "text",
        sendText,
        sendKeys,
        setScreenError,
        scrollToBottom,
      }),
    );

    act(() => {
      result.current.toggleShift();
    });

    await act(async () => {
      await result.current.handleSendKey("Tab");
    });

    act(() => {
      result.current.toggleCtrl();
    });

    await act(async () => {
      await result.current.handleSendKey("Left");
    });

    expect(sendKeys).toHaveBeenNthCalledWith(1, "pane-1", ["BTab"]);
    expect(sendKeys).toHaveBeenNthCalledWith(2, "pane-1", ["C-Left"]);
  });
});
