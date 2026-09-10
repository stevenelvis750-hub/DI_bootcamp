// Exercise 1: Promise.all()

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
	setTimeout(resolve, 3000, 'foo');
});

// Promise.all waits for every item to resolve and keeps the original order.
// It also accepts regular values, so 42 becomes the second resolved value.
// If any promise rejects, the returned promise rejects and catch handles it.
Promise.all([promise1, promise2, promise3])
	.then(values => {
		console.log(values); // [3, 42, 'foo']
	})
	.catch(error => {
		console.error('Promise.all failed:', error);
	});

// Exercise 2: Analyse Promise.all()

function timesTwoAsync(x) {
	return new Promise(resolve => resolve(x * 2));
}

const arr = [1, 2, 3];
const promiseArr = arr.map(timesTwoAsync);

Promise.all(promiseArr)
	.then(result => {
		// Each array value is doubled, so the output is [2, 4, 6].
		console.log(result);
	});
