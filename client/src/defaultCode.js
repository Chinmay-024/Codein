const defaultCode = {};

defaultCode.cpp = `#include <iostream>
#include <stdio.h>

using namespace std;

int main() {
  cout<<"Welcome to Codein\\n";
  return 0;
}
`;

defaultCode.py = `print("Welcome to Codein")`;

defaultCode.c = `#include <stdio.h>

int main() {
    // Write C code here
    printf("Welcome to Codein");
    
    return 0;
}`;

defaultCode.java = `import java.util.*;
import java.lang.*;
import java.io.*;

/* Name of the class has to be "Main" only.*/
class Main
{
	public static void main (String[] args) throws java.lang.Exception
	{
		// your code goes here
		System.out.println("Welcome to Codein");
	}
}
`;

defaultCode.js = `console.log("Welcome to Codein!");`;

export default defaultCode;
