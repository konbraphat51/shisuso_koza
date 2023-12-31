async function main() {
	SetFont("100px arial")
	// //""つける
	// DrawText("ああ", 300, 500)
	// //数字はつけなくても大丈夫
	// DrawText(1247809734, 300, 550)
	// //色はHEX(16進数）を#から始める
	// //https://htmlcolorcodes.com/
	// DrawText("いい", 300, 100)
	// SetColor("#4EB72E") //緑
	// DrawText("ああ", 300, 200)
	//計算
	// DrawText(1 + 1, 300, 300)
	// DrawText(1 - 1, 300, 350)
	// DrawText(1 * 1, 300, 400)
	// DrawText(1 / 2, 300, 450)
	// DrawText(3 % 2, 300, 500)
	//変数
	//
	// let a = 1 //変数を作るときは"let"
	// DrawText(a, 300, 300)
	// a = 2
	// DrawText(a, 300, 400)
	// a += 1 //=の左に演算子で変数の中身を計算
	// DrawText(a, 300, 500)

	//ループ
	//cntとカウンターを用意して、cnt < 3を満たす限り、cntを1増やしながらループ
	// for (let cnt = 0; cnt < 3 /* 繰り返す回数*/; cnt++) {
	// 	DrawText(cnt, 300, 300 + cnt * 100)
	// }

	//待て
	// DrawText("待って", 300, 300)
	// await Sleep(2000) //一時停止、ミリ秒 1000ms -> 1s
	// DrawText("待った", 300, 400)

	// //無限ループ
	// for (let cnt = 0; ; cnt++) {
	// 	//消去
	// 	SetColor("white")
	// 	DrawRect(0, 0, 800, 600)

	// 	SetColor("black")
	// 	DrawText("無限ループ", 300, 300 + cnt) //これだと長引く

	// 	await Sleep(1) //休憩時間、冷却時間
	// }

	// //四角形表示
	// SetColor("red")
	// DrawRect(100, 150, 300, 200)

	// await Sleep(1000)

	// //消えたように見せる
	// SetColor("white")
	// DrawRect(0, 0, 800, 600)

	// //if文
	// if (1 == 1) {
	// 	//条件文あってる
	// 	DrawText(1 != 1, 300, 300)
	// } else {
	// 	//条件文間違ってる
	// 	DrawText("1 != 1", 300, 300)
	// }

	// //!=でノンイコール
	// if (1 != 2) {
	// 	//条件文あってる
	// 	DrawText("1 != 2", 300, 400)
	// }

	// //!で
	// if (!(1 == 2)) {
	// 	//条件文あってる
	// 	DrawText("!(1 == 2)", 300, 500)
	// }

	// if (1 == 1 && 2 == 2) {
	// 	//条件文あってる
	// 	DrawText("1 == 1 && 2 == 2", 300, 600)
	// }

	// if (1 == 1 || 1 == 2) {
	// 	//条件文あってる
	// 	DrawText("1 == 1 || 1 == 2", 300, 100)
	// }

	//キー入力
	//無限ループ
	// for (let cnt = 0; ; cnt++) {
	// 	//消去
	// 	SetColor("white")
	// 	DrawRect(0, 0, 800, 600)

	// 	SetColor("black")
	// 	if (GetKey("ArrowRight")) {
	// 		DrawText("Space", 300, 300)
	// 	}

	// 	await Sleep(1) //休憩時間、冷却時間
	// }

	//移動
	// let x = 300
	// let y = 300
	// let speed = 3 //変数化しておこう
	// for (let cnt = 0; ; cnt++) {
	// 	//消去
	// 	SetColor("white")
	// 	DrawRect(0, 0, 800, 600)

	// 	SetColor("black")
	// 	DrawText("a", x, y)

	// 	if (GetKey("ArrowRight")) {
	// 		x += speed
	// 	}
	// 	if (GetKey("ArrowLeft")) {
	// 		x -= speed
	// 	}
	// 	if (GetKey("ArrowUp")) {
	// 		y -= speed
	// 	}
	// 	if (GetKey("ArrowDown")) {
	// 		y += speed
	// 	}

	// 	await Sleep(1) //休憩時間、冷却時間
	// }

	function IsColliding(x1, y1, r1, x2, y2, r2) {
		return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5 < r1 + r2
	}

	class Bullet {
		constructor(x, y) {
			this.x = x
			this.y = y
			this.hitted = false
		}
	}

	let x = 300
	let y = 300
	let speed = 3 //変数化しておこう
	let playerRadius = 30
	let playerHitted = false
	let bullets = []
	let bulletSpeed = 2
	let bulletsRadius = 10
	let score = 0
	let highScore = 0
	for (let cnt = 0; ; cnt++) {
		//消去
		SetColor("white")
		DrawRect(0, 0, 800, 600)

		//プレイヤー
		if (playerHitted) {
			SetColor("red")
		} else {
			SetColor("black")
		}

		DrawCircle(x, y, playerRadius)

		//弾を描く
		for (let cnt = 0; cnt < bullets.length; cnt++) {
			if (bullets[cnt].hitted) {
				//当たってる弾
				SetColor("red")
			} else {
				//当たってない弾
				SetColor("blue")
			}
			DrawCircle(bullets[cnt].x, bullets[cnt].y, bulletsRadius)
		}

		//弾を生成
		//1フレーム当たり10%の確率で弾を生成
		if (Math.random() < 0.1) {
			//pythonのappendと同じ
			let x = Math.random() * 800
			let y = Math.random() * 100 - 200
			bullets.push(new Bullet(x, y))
		}

		//弾を動かす
		for (let cnt = 0; cnt < bullets.length; cnt++) {
			bullets[cnt].y += bulletSpeed
		}

		//画面外に出た弾を消す
		for (let cnt = bullets.length - 1; cnt >= 0; cnt--) {
			if (bullets[cnt].y > 600 + bulletsRadius) {
				bullets.splice(cnt, 1)
			}
		}

		//スコア描く
		SetColor("black")
		DrawText(Math.floor(score), 600, 80)

		//スコア加算
		score += 0.1

		//ハイスコア更新
		if (score > highScore) {
			highScore = score
		}

		//ハイスコア描く
		SetColor("black")
		DrawText(Math.floor(highScore), 600, 150)

		//当たり判定
		playerHitted = false //いったんfalseにしておく、一度でも当たったらtrueになるが、一度も当たらなかったらfalseのまま
		for (let cnt = 0; cnt < bullets.length; cnt++) {
			if (
				//関数化すればするほど褒められる
				IsColliding(
					x,
					y,
					playerRadius,
					bullets[cnt].x,
					bullets[cnt].y,
					bulletsRadius,
				)
			) {
				//弾が当たったことを記憶させる
				bullets[cnt].hitted = true

				playerHitted = true

				score = 0
			} else {
				//当たってないとき
				bullets[cnt].hitted = false
			}
		}

		//移動
		if (GetKey("ArrowRight")) {
			x += speed
		}
		if (GetKey("ArrowLeft")) {
			x -= speed
		}
		if (GetKey("ArrowUp")) {
			y -= speed
		}
		if (GetKey("ArrowDown")) {
			y += speed
		}

		await Sleep(1) //休憩時間、冷却時間
	}

	// //配列
	// let a = [1, 2, 3]
	// for (let cnt = 0; cnt < a.length /* aの要素数 */; cnt++) {
	// 	//for文とセットで使う
	// 	DrawText(a[cnt], 300, 300 + cnt * 100)
	// }
}
