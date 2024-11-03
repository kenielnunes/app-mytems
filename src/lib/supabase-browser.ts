import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vY211dW56c3Nud2Zoc3N4bHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2NDU4NDAsImV4cCI6MjAyNzIyMTg0MH0.1FyXc4jhDxUK5PWG-UCysaWIoi751-uYHDeJG-4AzTE";

const SUPABASE_URL = "https://mocmuunzssnwfhssxltd.supabase.co";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const setupPresence = (channelName: string) => {
  const channel = supabase.channel(channelName);

  channel
    .on("presence", { event: "sync" }, () => {
      console.log("Synced presence state: ", channel.presenceState());
    })
    .subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.track({ is_online: true });
      }
    });

  return channel;
};
