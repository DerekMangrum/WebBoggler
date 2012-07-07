<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WebBoggler.Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<link href="css/styles.css" rel="stylesheet" type="text/css" />
	<script src="js/jquery-1.7.2.min.js" type="text/javascript"></script>
	<script src="js/code.js" type="text/javascript"></script>
	<title></title>
</head>
<body>
	<form id="form1" runat="server">
	<div id="controls" class="controlsContainer">
		<input type="button" id="btnStart" value="Start Round" class="inputControl" onclick="StartRound(newRound)" />
		<input type="button" id="btnPause" value="Pause Round" class="inputControl" onclick="PauseRound()" />
		<input type="button" id="btnStop" value="End Round" class="inputControl" onclick="ResetRound()" />
		<div id="timerContainer" class="timerContainer">
			<p>
				TIMER</p>
			<span id="txtTimer" class="timer">3:00</span>
		</div>
	</div>
	<div id="divDice" class="dieContainer">
		<input type="text" id="die0" value="W" class="dice" />
		<input type="text" id="die1" value="E" class="dice" />
		<input type="text" id="die2" value="L" class="dice" />
		<input type="text" id="die3" value="C" class="dice" />
		<input type="text" id="die4" value="O" class="dice" />
		<input type="text" id="die5" value="M" class="dice" />
		<input type="text" id="die6" value="E" class="dice" />
		<input type="text" id="die7" value="T" class="dice" />
		<input type="text" id="die8" value="O" class="dice" />
		<input type="text" id="die9" value="B" class="dice" />
		<input type="text" id="die10" value="O" class="dice" />
		<input type="text" id="die11" value="G" class="dice" />
		<input type="text" id="die12" value="G" class="dice" />
		<input type="text" id="die13" value="L" class="dice" />
		<input type="text" id="die14" value="E" class="dice" />
		<input type="text" id="die15" value="!" class="dice" />
	</div>
	</form>
</body>
</html>
