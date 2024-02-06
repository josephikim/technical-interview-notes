# Binary
Binary number syntax uses a leading zero followed by a lowercase or uppercase Latin letter "B" (0b or 0B). Any character after the 0b that is not 0 or 1 will terminate the literal sequence.

0b10000000000000000000000000000000 // 2147483648
0b01111111100000000000000000000000 // 2139095040
0B00000000011111111111111111111111 // 8388607

# Octal
Octal number syntax uses a leading zero followed by a lowercase or uppercase Latin letter "O" (0o or 0O). Any character after the 0o that is outside the range (01234567) will terminate the literal sequence.

0O755 // 493
0o644 // 420

If you use an invalid number in the octal literal, JavaScript will throw a SyntaxError as shown in the following example:

```let d = 0o58;
console.log(d); // SyntaxError
```

# Hexadecimal
Hexadecimal number syntax uses a leading zero followed by a lowercase or uppercase Latin letter "X" (0x or 0X). Any character after the 0x that is outside the range (0123456789ABCDEF) will terminate the literal sequence.

0xFFFFFFFFFFFFFFFFF // 295147905179352830000
0x123456789ABCDEF   // 81985529216486900
0XA                 // 10

# BigInt literal
The BigInt type is a numeric primitive in JavaScript that can represent integers with arbitrary precision. BigInt literals are created by appending n to the end of an integer.

123456789123456789n     // 123456789123456789
0o777777777777n         // 68719476735
0x123456789ABCDEFn      // 81985529216486895
0b11101001010101010101n // 955733

BigInt literals cannot start with 0 to avoid confusion with legacy octal literals.

0755n; // SyntaxError: invalid BigInt syntax

For octal BigInt numbers, always use zero followed by the letter "o" (uppercase or lowercase):

0o755n;