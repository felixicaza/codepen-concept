const css = `html,
body {
  margin: 0;
  height: 100vh;
}

body {
  display: grid;
  place-items: center;
  background: #010307;
}

.container {
  display: grid;
  place-items: center;
}

.lines-container {
  display: grid;
  z-index: 2;
  place-items: center;
  height: 550px;
  width: 550px;
}

.line-1 {
  display: flex;
  height: 550px;
  width: 3px;
  background: linear-gradient(transparent, #83ccff, transparent);
}

.lines-container::after {
  content: "";
  display: grid;
  position: absolute;
  height: 12px;
  width: 12px;
  background: #83ccff;
  transform: rotate(45deg);
}

.line-2 {
  display: flex;
  height: 3px;
  width: 650px;
  background: linear-gradient(to right, transparent, #83ccff, transparent);
  position: absolute;
}

.circle {
  display: grid;
  position: absolute;
  height: 250px;
  width: 250px;
  border-radius: 50%;
  background: linear-gradient(150deg, #32b7f8, #1f7bed, #0a38e2, #1049e4);
  filter: drop-shadow(0 0 64px #32b7f864);
}

.container::after {
  content: "";
  display: flex;
  height: 350px;
  width: 350px;
  background: #0000001;
  transform: translate(176px, -176px);
  position: absolute;
  backdrop-filter: blur(48px);
}`

export default css
