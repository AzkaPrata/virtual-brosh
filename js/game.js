setGame("1200x600");
game.folder = "assets";
//file gambar yang dipakai dalam game
var gambar = {
  //!logo Dari Wandah
  logo: "logo.png",
  startBtn: "tombolStart.png",
  cover: "cover.jpg",
  playBtn: "btn-play.png",
  maxBtn: "maxBtn.png",
  minBtn: "minBtn.png",
  //!Karakter Laki Laki
  idle: "Idle.png",
  Jump: "Loncat.png",
  Run: "Lari.png",
  Fall: "Jatuh.png",
  Hit: "Tertembak.png",
  //!Karakter Perempuan
  IdleC: "DiamC.png",
  JumpC: "LoncatC.png",
  RunC: "LariC.png",
  FallC: "JatuhC.png",
  HitC: "TertembakC.png",
  //!Tile Set Atau Sumberdaya
  tileset: "Terrain.png",
  //!Background
  BG: "Gray.png",
  //!level
  LVL1: "01.png",
  LVL2: "02.png",
  LVL1: "03.png",
  LVL1: "04.png",
  LVL1: "05.png",
  LVL1: "06.png",
  LVL1: "07.png",
  LVL1: "08.png",
  LVL1: "09.png",
  LVL1: "10.png",
  LVL1: "11.png",
  LVL1: "12.png",
  LVL1: "13.png",
  LVL1: "14.png",
  LVL1: "15.png",
  LVL1: "16.png",
  LVL1: "17.png",
  LVL1: "18.png",
  LVL1: "19.png",
  LVL1: "20.png",
  LVL1: "21.png",
  //! Item
  Item1: "Strawberry.png",
  Item2: "Kiwi.png",
  //! Musuh
  Idlee: "Idlee.png",
  Rune: "Larie.png",
  Hite: "Hit.png",
  //! Flag Finish
  Bendera: "Flag.png",
};
//file suara yang dipakai dalam game
var suara = {};

//load gambar dan suara lalu jalankan startScreen
loading(gambar, suara, startScreen);

function startScreen() {
  hapusLayar("#67d2d6");
  var startBtn = tombol(dataGambar.startBtn, 600, 350);
  if (tekan(startBtn)) {
    jalankan(halamanCover);
  }
}
function halamanCover() {
  hapusLayar("#67d2d6");
  gambarFull(dataGambar.cover);
  var playBtn = tombol(dataGambar.playBtn, 600, 350);
  if (tekan(playBtn)) {
    setAwal();
    jalankan(PilihKarakter);
  }
  resizeBtn(1150, 50);
}

function PilihKarakter() {
  hapusLayar("#67d2d6");
  latar(dataGambar.BG, 0, 0.5);
  tampilkanGambar(dataGambar.Jump, 800, 450);
  var playBtn = tombol(dataGambar.playBtn, 283, 520);
  if (tekan(playBtn)) {
    setAwal();
    jalankan(gameLoopL);
  }
  var playBtnC = tombol(dataGambar.playBtn, 826, 520);
  if (tekan(playBtnC)) {
    setAwalC();
    jalankan(gameLoopC);
  }
}

function setAwal() {
  game.hero = setSprite(dataGambar.idle, 32, 32);
  game.hero.animDiam = dataGambar.idle;
  game.hero.animLompat = dataGambar.Jump;
  game.hero.animJalan = dataGambar.Run;
  game.hero.animJatuh = dataGambar.Fall;
  game.hero.animMati = dataGambar.Hit;
  game.skalaSprite = 2;
  setPlatform(map_1, dataGambar.tileset, 32, game.hero);
  game.gameOver = ulangiPermainan;
  setPlatformItem(1, dataGambar.Item1);
  setPlatformItem(2, dataGambar.Item2);
  var musuh1 = {};
  musuh1.animDiam = dataGambar.Idlee;
  musuh1.animJalan = dataGambar.Rune;
  musuh1.animMati = dataGambar.Hite;
  setPlatformEnemy(1, musuh1);
  setPlatformTrigger(1, dataGambar.Bendera);
}

function ulangiPermainan() {
  game.aktif = true;
  setAwal();
  jalankan(gameLoop);
}

function gameLoopL() {
  hapusLayar();
  if (game.kanan) {
    gerakLevel(game.hero, 3, 0);
  } else if (game.kiri) {
    gerakLevel(game.hero, -3, 0);
  }
  if (game.atas) {
    gerakLevel(game.hero, 0, -10);
  }
  latar(dataGambar.BG, 0, 0);
  buatLevel();
  cekItem();
  teks(game.score, 40, 60);
}

function cekItem() {
  if (game.itemID > 0) {
    tambahScore(10);
    game.itemID = 0;
  }

  if (game.triggerID == 1) {
    game.triggerID = 0;
    game.level++;
    game.aktif = false;
  }
}

function setAwalC() {
  game.heroC = setSprite(dataGambar.IdleC, 32, 32);
  game.heroC.animDiam = dataGambar.IdleC;
  game.heroC.animLompat = dataGambar.JumpC;
  game.heroC.animJalan = dataGambar.RunC;
  game.heroC.animJatuh = dataGambar.FallC;
  game.heroC.animMati = dataGambar.HitC;
  setPlatform(map_1, dataGambar.tileset, 32, game.heroC);
  game.gameOver = ulangiPermainanC;
  setPlatformItem(1, dataGambar.Item1);
  setPlatformItem(2, dataGambar.Item2);
  var musuh1 = {};
  musuh1.animDiam = dataGambar.Idlee;
  musuh1.animJalan = dataGambar.Rune;
  musuh1.animMati = dataGambar.Hite;
  setPlatformEnemy(1, musuh1);
  setPlatformTrigger(1, dataGambar.Bendera);
}

function ulangiPermainanC() {
  game.aktif = true;
  game.score = 0;
  setAwalC();
  jalankan(gameLoopC);
}

function gameLoopC() {
  hapusLayar();
  if (game.kanan) {
    gerakLevel(game.heroC, 3, 0);
  } else if (game.kiri) {
    gerakLevel(game.heroC, -3, 0);
  }
  if (game.atas) {
    gerakLevel(game.heroC, 0, -10);
  }
  latar(dataGambar.BG, 0, 0);
  buatLevel();
  cekItem();
  teks(game.score, 40, 60);
}

function cekItem() {
  if (game.itemID > 0) {
    tambahScore(10);
    game.itemID = 0;
  }

  if (game.triggerID == 1) {
    game.triggerID = 0;
    game.aktif = false;
    game.level++;
  }
}
