import ServiceLanding from "@/components/ServiceLanding";
import { getIndustry } from "@/lib/industries";
import { buildMetadata } from "@/lib/site";

const data = getIndustry("penerjemah-medis");

export const metadata = buildMetadata(data);

export default function Page() {
  return <ServiceLanding data={data} />;
}
