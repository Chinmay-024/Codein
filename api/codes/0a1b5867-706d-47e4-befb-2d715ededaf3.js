<script>

// Recursive Javascript program to check if
// a string is subsequence of another string

// Returns true if str1[] is a
// subsequence of str2[] m is
// length of str1 and n is length
// of str2
function isSubSequence(str1, str2, m, n)
{
	
	// Base Cases
	if (m == 0)
		return true;
	if (n == 0)
		return false;
		
	// If last characters of two strings
	// are matching
	if (str1[m - 1] == str2[n - 1])
		return isSubSequence(str1, str2,
							m - 1, n - 1);

	// If last characters are not matching
	return isSubSequence(str1, str2, m, n - 1);
}

// Driver code
let str1 = "gksrek";
let str2 = "geeksforgeeks";
let m = str1.length;
let n = str2.length;
let res = isSubSequence(str1, str2, m, n);

if (res)
	document.write("Yes");
else
	document.write("No");
	
// This code is contributed by divyesh072019

</script>
