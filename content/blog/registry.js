import p0 from "./apa-itu-juru-bahasa-isyarat";
import p1 from "./apakah-bisa-memesan-interpreter-online";
import p2 from "./apakah-juru-bahasa-isyarat-harus-bersertifikat";
import p3 from "./berapa-lama-booking-sebelum-acara";
import p4 from "./berapa-tarif-juru-bahasa-isyarat";
import p5 from "./bisindo-vs-sibi-perbedaan";
import p6 from "./cara-membuat-event-ramah-tuli";
import p7 from "./cara-memesan-juru-bahasa-isyarat";
import p8 from "./cara-menyelenggarakan-event-inklusif";
import p9 from "./checklist-event-inklusif";
import p10 from "./faktor-harga-juru-bahasa-isyarat";
import p11 from "./interpreter-bahasa-isyarat-untuk-pelatihan";
import p12 from "./interpreter-bahasa-isyarat-untuk-wisuda";
import p13 from "./jasa-juru-bahasa-isyarat-profesional";
import p14 from "./juru-bahasa-isyarat-bali";
import p15 from "./juru-bahasa-isyarat-bandung";
import p16 from "./juru-bahasa-isyarat-instansi-pemerintah";
import p17 from "./juru-bahasa-isyarat-jakarta";
import p18 from "./juru-bahasa-isyarat-medan";
import p19 from "./juru-bahasa-isyarat-on-site";
import p20 from "./juru-bahasa-isyarat-online";
import p21 from "./juru-bahasa-isyarat-pelayanan-publik";
import p22 from "./juru-bahasa-isyarat-surabaya";
import p23 from "./juru-bahasa-isyarat-untuk-acara";
import p24 from "./juru-bahasa-isyarat-untuk-kepolisian";
import p25 from "./juru-bahasa-isyarat-untuk-konferensi";
import p26 from "./juru-bahasa-isyarat-untuk-meeting-perusahaan";
import p27 from "./juru-bahasa-isyarat-untuk-pengadilan";
import p28 from "./juru-bahasa-isyarat-untuk-rumah-sakit";
import p29 from "./juru-bahasa-isyarat-untuk-sekolah";
import p30 from "./juru-bahasa-isyarat-untuk-seminar";
import p31 from "./juru-bahasa-isyarat-untuk-universitas";
import p32 from "./juru-bahasa-isyarat-untuk-webinar";
import p33 from "./kapan-harus-menggunakan-juru-bahasa-isyarat";
import p34 from "./layanan-interpreter-bahasa-isyarat";
import p35 from "./mengapa-juru-bahasa-isyarat-penting-aksesibilitas";
import p36 from "./panduan-accessibility-event-hybrid";
import p37 from "./panduan-memilih-penerjemah-tersumpah";
import p38 from "./pentingnya-aksesibilitas-event-perusahaan";
import p39 from "./siapa-yang-membutuhkan-juru-bahasa-isyarat";
import p40 from "./tips-memilih-juru-bahasa-isyarat-profesional";
import p41 from "./tugas-dan-peran-juru-bahasa-isyarat";

const posts = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24, p25, p26, p27, p28, p29, p30, p31, p32, p33, p34, p35, p36, p37, p38, p39, p40, p41];

export function allPosts() {
  return posts.slice().sort((a, b) => (a.published < b.published ? 1 : a.published > b.published ? -1 : 0));
}
export function allSlugs() {
  return posts.map((p) => p.slug);
}
export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}
