export interface Translation {
  appName: string;
  home: string;
  lessons: string;
  wallet?: string;
  profile: string;
  settings: string;
  welcome: string;
  homeDesc: string;
  getStarted: string;
  startLesson: string;
  back: string;
  lessonCompleted: string;
  user: string;
  guest: string;
  progress: string;
  completed: string;
  question: string;
  of: string;
  afterChoice: string;
  correct: string;
  incorrect: string;
  startThisLesson: string;
  // Home page translations
  quickActions: string;
  dao: string;
  learn: string;
  activityFeed: string;
  bachAirdropLive: string;
  airdropDescription: string;
  claimYourAirdrop: string;
  claimYourBachAirdrop: string;
  signUpAndClaim: string;
  walletAddressUsedAirdrop: string;
  bachMoney: string;
  successClaimedAirdrop: string;
  claimAirdrop: string;
  signMessageProveOwnership: string;
  signing: string;
  signAndClaim: string;
  signatureOnlyForVerification: string;
  tryAgain: string;
  setYourUsername: string;
  chooseUsernamePersonalize: string;
  enterYourUsername: string;
  saveUsername: string;
  saved: string;
  usernameSavedSuccessfully: string;
}

export type SupportedLanguages = "en" | "sv" | "id";

export const translations: Record<SupportedLanguages, Translation> = {
  en: {
    appName: "NotWallet",
    home: "Home",
    lessons: "Lessons",
    settings: "Settings",
    wallet: "Wallet",
    profile: "Profile",
    welcome: "Welcome to NotWallet Crypto!",
    homeDesc: "A fun way to learn Persian.",
    getStarted: "Start Learning",
    startLesson: "Start",
    back: "← Back",
    lessonCompleted: "Lesson Complete! 🎉",
    user: "Username",
    guest: "Guest",
    progress: "Progress",
    completed: "lesson(s) completed",
    question: "Question",
    of: "of",
    afterChoice: "The result will be shown after you select.",
    correct: "Correct!",
    incorrect: "Incorrect!",
    startThisLesson: "Start Lesson",
    // Home page translations
    quickActions: "Quick Actions",
    dao: "DAO",
    learn: "Learn",
    activityFeed: "Activity Feed",
    bachAirdropLive: "🪂 BACH Airdrop Live!",
    airdropDescription:
      "Multiple ways to earn your BACH tokens! Complete tasks, contribute to the music database, and participate in the ecosystem.",
    claimYourAirdrop: "Claim Your Airdrop →",
    claimYourBachAirdrop: "🎉 Claim Your $BACH Airdrop!",
    signUpAndClaim: "Sign Up & Claim",
    walletAddressUsedAirdrop:
      "Your wallet address will be used for the airdrop.",
    bachMoney: "bach.money",
    successClaimedAirdrop: "🎊 Success! You have claimed your airdrop.",
    claimAirdrop: "Claim Airdrop",
    signMessageProveOwnership:
      "Sign this message to prove wallet ownership and claim your airdrop.",
    signing: "Signing...",
    signAndClaim: "Sign & Claim",
    signatureOnlyForVerification:
      "Your signature is only used to verify your wallet address.",
    tryAgain: "Try Again",
    setYourUsername: "👤 Set Your Username",
    chooseUsernamePersonalize: "Choose a username to personalize your wallet.",
    enterYourUsername: "Enter your username",
    saveUsername: "Save Username",
    saved: "Saved!",
    usernameSavedSuccessfully: "Username saved successfully!",
  },
  sv: {
    appName: "NotWallet",
    home: "Hem",
    lessons: "Lektioner",
    settings: "Inställningar",
    wallet: "Plånbok",
    profile: "Profil",
    welcome: "Välkommen till NotWallet Crypto!",
    homeDesc: "Ett roligt sätt att lära sig persiska.",
    getStarted: "Börja lära",
    startLesson: "Starta",
    back: "← Tillbaka",
    lessonCompleted: "Lektion klar! 🎉",
    user: "Användarnamn",
    guest: "Gäst",
    progress: "Framsteg",
    completed: "lektion(er) slutförda",
    question: "Fråga",
    of: "av",
    afterChoice: "Resultatet visas när du har valt.",
    correct: "Rätt!",
    incorrect: "Fel!",
    startThisLesson: "Starta lektionen",
    // Home page translations
    quickActions: "Snabbåtgärder",
    dao: "DAO",
    learn: "Lär dig",
    activityFeed: "Aktivitetsflöde",
    bachAirdropLive: "🪂 BACH Airdrop Live!",
    airdropDescription:
      "Flera sätt att tjäna dina BACH-tokens! Slutför uppgifter, bidra till musikdatabasen och delta i ekosystemet.",
    claimYourAirdrop: "Hämta din Airdrop →",
    claimYourBachAirdrop: "🎉 Hämta din $BACH Airdrop!",
    signUpAndClaim: "Registrera dig & Hämta",
    walletAddressUsedAirdrop:
      "Din plånboksadress kommer att användas för airdroppen.",
    bachMoney: "bach.money",
    successClaimedAirdrop: "🎊 Framgång! Du har hämtat din airdrop.",
    claimAirdrop: "Hämta Airdrop",
    signMessageProveOwnership:
      "Signera detta meddelande för att bevisa ägarskap av plånbok och hämta din airdrop.",
    signing: "Signerar...",
    signAndClaim: "Signera & Hämta",
    signatureOnlyForVerification:
      "Din signatur används endast för att verifiera din plånboksadress.",
    tryAgain: "Försök igen",
    setYourUsername: "👤 Ange ditt användarnamn",
    chooseUsernamePersonalize:
      "Välj ett användarnamn för att personalisera din plånbok.",
    enterYourUsername: "Ange ditt användarnamn",
    saveUsername: "Spara användarnamn",
    saved: "Sparat!",
    usernameSavedSuccessfully: "Användarnamn sparat framgångsrikt!",
  },
  id: {
    appName: "NotWallet",
    home: "Beranda",
    lessons: "Pelajaran",
    settings: "Pengaturan",
    wallet: "Dompet",
    profile: "Profil",
    welcome: "Selamat datang di NotWallet Crypto!",
    homeDesc: "Cara yang menyenangkan untuk belajar bahasa Persia.",
    getStarted: "Mulai Belajar",
    startLesson: "Mulai",
    back: "← Kembali",
    lessonCompleted: "Pelajaran Selesai! 🎉",
    user: "Nama Pengguna",
    guest: "Tamu",
    progress: "Kemajuan",
    completed: "pelajaran selesai",
    question: "Pertanyaan",
    of: "dari",
    afterChoice: "Hasil akan ditampilkan setelah Anda memilih.",
    correct: "Benar!",
    incorrect: "Salah!",
    startThisLesson: "Mulai Pelajaran",
    // Home page translations
    quickActions: "Aksi Cepat",
    dao: "DAO",
    learn: "Belajar",
    activityFeed: "Feed Aktivitas",
    bachAirdropLive: "🪂 Airdrop BACH Live!",
    airdropDescription:
      "Berbagai cara untuk mendapatkan token BACH Anda! Selesaikan tugas, berkontribusi pada database musik, dan berpartisipasi dalam ekosistem.",
    claimYourAirdrop: "Klaim Airdrop Anda →",
    claimYourBachAirdrop: "🎉 Klaim Airdrop $BACH Anda!",
    signUpAndClaim: "Daftar & Klaim",
    walletAddressUsedAirdrop:
      "Alamat dompet Anda akan digunakan untuk airdrop.",
    bachMoney: "bach.money",
    successClaimedAirdrop: "🎊 Berhasil! Anda telah mengklaim airdrop Anda.",
    claimAirdrop: "Klaim Airdrop",
    signMessageProveOwnership:
      "Tanda tangani pesan ini untuk membuktikan kepemilikan dompet dan klaim airdrop Anda.",
    signing: "Menandatangani...",
    signAndClaim: "Tanda Tangan & Klaim",
    signatureOnlyForVerification:
      "Tanda tangan Anda hanya digunakan untuk memverifikasi alamat dompet Anda.",
    tryAgain: "Coba Lagi",
    setYourUsername: "👤 Atur Nama Pengguna Anda",
    chooseUsernamePersonalize:
      "Pilih nama pengguna untuk mempersonalisasi dompet Anda.",
    enterYourUsername: "Masukkan nama pengguna Anda",
    saveUsername: "Simpan Nama Pengguna",
    saved: "Tersimpan!",
    usernameSavedSuccessfully: "Nama pengguna berhasil disimpan!",
  },
};
