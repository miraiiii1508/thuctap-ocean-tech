@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\@emotion\babel-plugin\node_modules\resolve\bin\resolve" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\@emotion\babel-plugin\node_modules\resolve\bin\resolve" %*
)