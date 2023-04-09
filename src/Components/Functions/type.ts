interface TypeProps{
    wait?: number,
    initialWait?: number,
    finalWait?: number,
    lineWait?: number,
    typerClass?: string,
	styles?: string,
    useContainer?: boolean,
    stopBlinking?: boolean,
    processChars?: boolean,
    clearContainer?: boolean,
}

function pause(s = 1) {
	return new Promise(resolve => setTimeout(resolve, 1000 * Number(s)));
}

function scroll(el: any = document.querySelector(".terminal")) {
	el.scrollTop = el.scrollHeight;
}

async function type(
	text : string | string[],
	options: TypeProps,
	container: any = document.querySelector(".terminal"),
	self?: any
) {
	if (self && self.abort){
		self.abort = false;
		return;
	}

	if (!text || text.length === 0){
		return Promise.resolve();
	}

	let {
		wait = 30,
		initialWait = 1000,
		finalWait = 500,
		lineWait = 100,
		typerClass = "",
		styles = "",
		useContainer = false,
		stopBlinking = true,
		processChars = false,
		clearContainer = false,
	} = options;

	// If text is an array, e.g. type(['foo', 'bar'])
	if (processChars && Array.isArray(text)) {
		for (const t of text){
			if (self && self.abort){
				self.abort = false;
				return;
			}
			await type(
				t,
				{
					...options,
					initialWait: lineWait,
					finalWait: lineWait
				},
				container
			);
		}

		return;
	}

	let interval: any;

	return new Promise(async (resolve) => {
		if (self && self.abort){
			self.abort = false;
			clearInterval(interval);
			interval = null;
			resolve('');
		}

		if (interval) {
			clearInterval(interval);
			interval = null;
		}
		// Create a div where all the characters can be appended to (or use the given container)
		let typer: any = useContainer
			? container
			: document.createElement("div");
		typer.classList.add("typer", "active");

		if (typerClass) {
			typer.classList.add(typerClass);
		}

		if (styles) {
			typer.setAttribute('style', styles);
		}
		// Handy if reusing the same container
		if (clearContainer) {
			container.innerHTML = "&nbsp;";
		}

		if (!useContainer) {
			container.appendChild(typer);
		}

		if (initialWait) {
			await pause(initialWait / 1000);
		}

		let queue:any = text;

		if (processChars && typeof text === 'string') {
			queue = text.split("");
		}
		else{
			queue = Array.from(text);
		}

		let prev:any;

		// Use an interval to repeatedly pop a character from the queue and type it on screen
		interval = setInterval(async () => {
			if (queue.length) {
				let char = queue.shift();

				// This is an optimisation for typing a large number of characters on the screen.
				// It seems the performance degrades when trying to add 500+ DOM elements rapidly on the screen.
				// So the content of the previous element is moved to the typer container and removed, which
				// reduces the amount of DOM elements.
				// This may cause issues when the element is removed while the character is still animating (red screen)
				if (processChars && typeof prev === 'object') {
					prev.remove();
					if (
						prev.firstChild &&
						prev.firstChild.nodeType ===
							Node.TEXT_NODE
					) {
						typer.innerText +=
							prev.innerText;
					} else {
						typer.appendChild(prev);
					}
				}
				let element = processChars ? getChar(char) : char;

				if (element && typeof element === 'object') {;
					typer.appendChild(element);

					if (element.nodeName === "BR") {
						scroll(container);
					}
				} else if (typeof element === 'string') {
					typer.innerHTML += element;
				}
				prev = element;
			} else {
				// When the queue is empty, clean up the interva

				clearInterval(interval);
				await pause(finalWait / 1000);

				if(!processChars){
					typer.innerHTML = text;
				}

				if (stopBlinking) {
					typer.classList.remove("active");
				}
				resolve('');
			}
		}, wait);
	});
}

function getChar(char: string | undefined) {
	let result;

	if (typeof char === "string") {
		if (char === "\n") {
			result = document.createElement("br");
		} else if (char === "\t") {
			let tab = document.createElement("span");
			tab.innerHTML = "&nbsp;&nbsp;&nbsp;";
			result = tab;
		} else if (char === " ") {
			let space = document.createElement("span");
			space.innerHTML = "&nbsp;";
			space.classList.add("char");
			result = space;
		} else if (char === "✓") {
			let span = document.createElement("span");
			span.classList.add("char");
			span.innerHTML = '<span class="font-lime">' + char + '</span>';
			result = span;
		} else {
			result = char;
		}
	}
	return result;
}

function clear(screen:any = document.querySelector(".terminal")) {
	screen.innerHTML = "";
}

export{
	type,
	clear,
	pause,
}