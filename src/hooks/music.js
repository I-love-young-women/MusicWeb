import { reactive } from "vue";

const music = reactive({
  name: "",
});

function getMusicUrl() {
  return music.value = "http://localhost:8080/" + music.name;
}

function changeMusic(value) {
  music.name = value;
}

export default { getMusicUrl, changeMusic };