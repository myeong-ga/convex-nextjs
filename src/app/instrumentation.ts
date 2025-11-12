import { registerOTelTCC } from "@contextcompany/otel/nextjs";

export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      // registerOTelTCC();
      registerOTelTCC({ debug: true });
    } catch (err) {
      // Avoid crashing local dev when the TCC WebSocket server isn't running.
      // You can silence this by running a local TCC server or gating via an env flag.
      console.warn(
        "[OTel TCC] Skipping telemetry initialization:",
        err instanceof Error ? err.message : err
      );
    }
  }
}