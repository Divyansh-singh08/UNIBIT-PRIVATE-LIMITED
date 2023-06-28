function Combination_For_4(target, arr) {
	arr.sort((a, b) => a - b);
	let num = Number.NEGATIVE_INFINITY;
	let ArrayPairs = [];

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] !== num) {
			num = arr[i];
			let num2 = Number.NEGATIVE_INFINITY;

			for (let j = i + 1; j < arr.length; j++) {
				if (num2 === arr[j]) {
					continue;
				}

				let sum = arr[i] + arr[j];
				num2 = arr[j];

				if (Math.abs(sum) === target) {
					ArrayPairs.push([arr[i], arr[j]]); // push the pairs into the array
				}
			}
		}
	}

	return ArrayPairs; // call the separate concatenate function and return the result
}

function concatenatePairs(ArrayPairs) {
	let concatenatedArray = [];

	for (let pair of ArrayPairs) {
		concatenatedArray = concatenatedArray.concat(pair); // concatenate each pair into the array
	}

	//after pairing sort them
	return concatenatedArray.sort((a, b) => a - b);
}

//===================================================================
function Combination_For_8(arr, targetSum) {
	let result = [];
	let n = arr.length;

	function backtrack(tempArr, currSum, start, used) {
		if (currSum === targetSum) {
			// Sort the subarray before comparing
			let sortedArray = tempArr.slice().sort((a, b) => a - b);
			if (!isDuplicate(sortedArray)) {
				let ans = [...tempArr];
				// if (ans.length === 4) {
				result.push(ans);
				// }
			}
		} else if (currSum > targetSum) {
			return;
		} else {
			for (let i = start; i < n; i++) {
				if (used[i]) continue; // Skip already used indices
				tempArr.push(arr[i]);
				used[i] = true;
				backtrack(tempArr, currSum + arr[i], i + 1, used);
				used[i] = false;
				tempArr.pop();
			}
		}
	}

	function isDuplicate(arr) {
		for (let subArr of result) {
			// Sort the existing subarray before comparing
			let sortedSubArr = subArr.slice().sort((a, b) => a - b);
			if (arraysAreEqual(sortedSubArr, arr)) {
				return true;
			}
		}
		return false;
	}

	function arraysAreEqual(arr1, arr2) {
		if (arr1.length !== arr2.length) {
			return false;
		}
		for (let i = 0; i < arr1.length; i++) {
			if (arr1[i] !== arr2[i]) {
				return false;
			}
		}
		return true;
	}

	backtrack([], 0, 0, {});
	return result;
}

let arr = [1, 3, 2, 2, -4, -6, -2, 8]; //given inputs
let target = 4; //given inputs

const CombinationOutput = Combination_For_4(target, arr);
console.log("First Combination For “4” :", CombinationOutput);

// The merged array into a single array with sorting (ascending ) order,
let Merge_Into_a_single_Array = concatenatePairs(CombinationOutput);
console.log("Merge Into a single Array : ", Merge_Into_a_single_Array);

let Double_Target = target * 2;
let Combination_For_8_output = Combination_For_8(
	Merge_Into_a_single_Array,
	Double_Target
);

console.log("Second Combination For “8” :", Combination_For_8_output);
