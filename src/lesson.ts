import { text, number, flag, list, object, hash, report, unique, safePath, type Lesson, type Input } from "./core";

// A focused local experiment derived from this lesson’s reviewed presentation.
export const lesson: Lesson = {
  number: 34,
  title: "Prompt Caching in Agent Sessions",
  description: "A long agent task repeatedly presents much of the same context to the model. Prompt caching can reuse repeated context instead of processing it as ordinary input every time.",
  concepts: ["Request cache counters differ from session totals", "Compare compatible scope", "Missing is not zero"],
  scope: "Compares two authored request cache readings. It does not set provider cache TTL or measure savings. Each run starts from a fresh local seed. The run journal stores results, not production workflow state.",
  cases: [{"id": "0", "label": "Compare matching request scope", "input": {"beforeRead": 100, "afterRead": 140, "sameScope": true}, "expected": "passed", "checks": {"readChange": 40}}, {"id": "1", "label": "Reject a different scope", "input": {"beforeRead": 100, "afterRead": 140, "sameScope": false}, "expected": "rejected", "checks": {}}, {"id": "2", "label": "Keep missing cache data unknown", "input": {"beforeRead": -1, "afterRead": 140, "sameScope": true}, "expected": "incomplete", "checks": {"readChange": null}}],
  async run(input) {

if(!flag(input,"sameScope"))return report("rejected","Model, agent, system, or tool scope differs",{},["Compare trusted resolved configuration before counters"]);
const a=number(input,"beforeRead"),b=number(input,"afterRead");
if(a<0||b<0)return report("incomplete","A request did not provide a valid cache reading",{readChange:null},["Retain missing observations as unknown"]);
return report("passed","Compared per-request cache-read counters",{beforeRead:a,afterRead:b,readChange:b-a,claims:{tokensSaved:"not established",latencyGain:"not measured",invoiceSavings:"not established"}},["Read request-end usage fields","Do not add cumulative session snapshots","A negative request-to-request change can be valid"]);

  }
};
