module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-control-regex": 0,
    // Severity should be one of the following: 0 = off, 1 = warn, 2 = error
    // @ts-ignore 주석 자체를 에러간주 방지
    "@typescript-eslint/ban-ts-comment": "off",
    // function type 정의시 에러간주 방지
    "@typescript-eslint/ban-types": "off",
    // any 타입 사용시 warning 방지
    "@typescript-eslint/no-explicit-any": "off",
    // react render function 에서 최상위가 div 또는 fragment 가 아닌 경우 에러간주 방지
    "react/react-in-jsx-scope": "off",
    // 재할당 되지않은 변수에 대하여 let 으로 선언시 에러간주 방지
    "prefer-const": "off",
    // 타입추론에 의한 타입정의 불필요 변수에대한 에러간주 방지
    "@typescript-eslint/no-inferrable-types": "off",
    // 빈 타입 함수선언에 대한 에러간주 방지
    "@typescript-eslint/no-empty-function": "off",
    // a 태그의 target 이 blank 인 경우 rel 속성 생략시 에러간주 방지
    "react/jsx-no-target-blank": "off",
    // interface 정의시 빈 함수에 대한 에러간주 방지
    "@typescript-eslint/no-empty-interface": "off",
    // prop 의 타입 생략시 에러간주 방지
    "react/prop-types": "off",
    "react/no-unknown-property": "off",
    // type aessertion(var!) 사용시 null 관련 워닝 방지
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        args: "none",
      },
    ],
  },
};
