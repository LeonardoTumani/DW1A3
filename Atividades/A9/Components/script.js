function updateOpacity() {
    var opacityValue = document.getElementById("opacity").value;
    document.getElementById("element").style.opacity = opacityValue;
  }

  function updateColor() {
    var colorValue = document.getElementById("color").value;
    document.getElementById("element").style.backgroundColor = colorValue;
  }

  function updateBorderRadius() {
    var borderRadiusValue = document.getElementById("borderRadius").value;
    document.getElementById("element").style.borderRadius = borderRadiusValue + "px";
  }

  function generateCode() {
    var opacityValue = document.getElementById("opacity").value;
    var colorValue = document.getElementById("color").value;
    var borderRadiusValue = document.getElementById("borderRadius").value;

    var code = '<div style = "\n    width: 200px;\n    height: 200px;\n    background-color: ' + colorValue + ';\n    opacity: ' + opacityValue + ';\n    border-radius: ' + borderRadiusValue + 'px;\n    border: 1px solid 8a8c8f;\n" > </div>';
    document.getElementById("codeOutput").value = code;
  }