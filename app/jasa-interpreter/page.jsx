import ServiceLanding from "@/components/ServiceLanding";
import { getService } from "@/lib/services";
import { buildMetadata } from "@/lib/site";

const data = getService("jasa-interpreter");

export const metadata = buildMetadata(data);

export default function Page() {
  return <ServiceLanding data={data} />;
}
