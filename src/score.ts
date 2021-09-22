export const score = {
  current: 0,
  currentHighScore: Number(localStorage.getItem('highScore') ?? 0),
  add(amount = 1) {
    this.current += amount;
    if (this.current > this.currentHighScore) {
      this.currentHighScore = this.current;
      localStorage.setItem('highScore', String(this.currentHighScore));
    }
  },
  reset() {
    this.current = 0;
  },
  get gameScore() {
    return String(this.current);
  },

  get highScore() {
    const score = this.currentHighScore ? String(this.currentHighScore) : '-';
    return `High Score: ${score}`;
  },
};
