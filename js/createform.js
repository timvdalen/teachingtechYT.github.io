function displayCustom(){
    if($(tab+' input[name="start"]').is(':checked')){
        $('.startExp').show();
    } else {
        $('.startExp').hide();
    }
    if($(tab+' input[name="centre"]').is(':checked')){
        $('.dia').show();
        $('.XY').hide();
    } else {
        $('.dia').hide();
        $('.XY').show();
    }
    if($(tab+' input[name="end"]').is(':checked')){
        $('.endExp').show();
    } else {
        $('.endExp').hide();
    }
}

var nozzleLayer = `
<h4>Nozzle Diameter / Layer Height</h4>
    <p>Select your nozzle diameter and layer height. If you have not changed your nozzle, it will likely be 0.4 mm. 0.2 mm is a typical layer height for this nozzle.</p>
    <label for="nozzleLayer">Select nozzle diameter / layer height:</label>
    <select name="nozzleLayer">
        <option value="40_20">0.4 mm nozzle / 0.2 mm layer height</option>
        <option value="40_16">0.4 mm nozzle / 0.16 mm layer height</option>
        <option value="40_12">0.4 mm nozzle / 0.12 mm layer height</option>
        <option value="30_15">0.3 mm nozzle / 0.15 mm layer height</option>
    </select>`;

var startGcode = `
<h4>Additional start gcode</h4>
            <p>If you have additional start commands, tick the box and enter the gcode. This can be used for an extruder prime sequence, overwriting the standard flow rate, standard speed, compensating for 2.85/3.00 mm filament, setting K factor and more. Tick the box for more details.</p>
            <label>Additional start gcode:<input name="start" type="checkbox" onchange="displayCustom();" value="extraStart"></label>
            <label>Add M80 to turn PSU on:<input name="psuon" type="checkbox" value="on"></label>
            <label>Remove <b>T0</b> from gcode (advanced users with MMU)<input name="removet0" type="checkbox"></label>
            <div class="startExp">
                <p>For the majority of users, you can skip this section. Any gcode entered here will be inserted after temperatures are set and homing is complete. Start gcode is saved by the browser, you should only have to enter it once. Example uses include:</p>
                <ul>
                    <li>Copying gcode commands from your slicer to draw an intro/prime/purge line. By default this is left out to accommodate delta printers.</li>
                    <li>Telling the firmware to alter the flow rate of the gcode to follow. This does not mean the exact flow rate you have set in your own slicer. For example, using <b><a href="https://marlinfw.org/docs/gcode/M221.html" target="_blank">M221</a> S120</b> would set the flow rate to 120% of what it was originally sliced as in Simpilfy3D. Use this to compensate for obvious over or under extrusion you may encounter with these tests. Additional information available at the base of the <a href="#flow">Flow Rate</a> tab.</li>
                    <li><b>M221 S38</b> can also be used to compensate for 2.85 mm filament and <b>M221 S34</b> for 3.00 mm filament instead of the default 1.75 mm.</li>
                    <li>Setting the K factor for linear advance. For example, <b>M900 K0.11</b></li>
                    <li>Custom ABL sequence. By default, only G28 is present. This gcode will be inserted immediately afer that so custom commands can be used here.</li>
                    <li>Anything else you have in your start gcode, such as setting acceleration values, E-steps, etc.</li>
                </ul>
                <textarea name="startgcode"></textarea>
            </div>`;

var bedDims =  `
<h4>Bed dimensions</h4>
            <p>Inputting the correct number will attempt to move the print into the centre of the bed. If the 0,0 at centre button is checked for a delta, also enter your bed diameter. Please check the gcode to ensure it will fit on your bed.</p>
            <label>0,0 at centre of bed (most deltas):<input name="centre" type="checkbox" onchange="displayCustom();" value="centre"></label>
            <span class="XY"><label>Bed X dimension (mm): <input type="number" name="bedx" value="100" min="100" max="600" step="1"></label>
            <label>Bed Y dimension (mm): <input type="number" name="bedy" value="100" min="100" max="600" step="1"></label><br /></span>
            <span class="dia"><label>Bed diameter dimension (mm): <input type="number" name="beddia" value="100" min="100" max="600" step="1"></label></span>`;

var extraMargin = `
<p>You may add extra margin for clearing bed clips, etc. Caution! If this is too large on small printers the squares will overlap. You may also use a negative value to space the squares further apart. Make sure to preview the gcode before printing!</p>
            <label>Extra margin from edge (mm): <input type="number" name="margin" value="0" min="0" max="100" step="1"></label>`;

var tempReg = `<h4>Temperatures</h4>
<p>For the hot end and bed respectively, typical PLA temperatures are 200 and 60, PETG 235 and 80, ABS 250 and 100, TPU 230 and 5 (effectively off).</p>
<label>Hot end temperature (deg C): <input type="number" name="hotendtemp" value="200" min="160" max="450"></label>
<label>Bed temperature (deg C): <input type="number" name="bedtemp" value="60" min="0" max="150"></label> (use 0 for a non heated bed)<br />`;

var tempTower = `<h4>Bed Temperature</h4>
<p>For bed, typical PLA temperatures are 60, PETG 80, ABS 100, TPU 5 (effectively off).</p>
<label>Bed temperature (deg C): <input type="number" name="bedtemp" value="60" min="0" max="150"></label> (use 0 for a non heated bed)
<h4>Hot end temperature</h4>
<p>Typically, filament comes with a recommended hot end temperature. It is recommended to use values either side of this. For instance, if a PLA filament asked for 200 degrees, you may vary the temperature from 190, 195, 200, 205, 210 (the default values of the form). Typically, the first layer temperature will be elevated to increase adhesion with the bed, especially if a lower than usual temperature is being trialled for segment A. <span class="sug">Suggested increments for how much to vary the value for each segment are shown in green.</span></p>
<table>
    <thead>
        <tr>
            <th>Reference Diagram</th>
            <th>Segment</th>
            <th>Hot end temperature<p class="sug">&#177; 5 - 10</p></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="6" style="text-align: center;">
                <img src="img/temperaturediagram.jpg" />
            </td>
            <td style="text-align: center;">E</td>
            <td><input type="number" min="150" max="450" name="temp_e1" value="210"></td>
        </tr>
        <tr>
            <td style="text-align: center;">D</td>
            <td><input type="number" min="150" max="450" name="temp_d1" value="205"></td>
        </tr>
        <tr>
            <td style="text-align: center;">C</td>
            <td><input type="number" min="150" max="450" name="temp_c1" value="200"></td>
        </tr>
        <tr>
            <td style="text-align: center;">B</td>
            <td><input type="number" min="150" max="450" name="temp_b1" value="195"></td>
        </tr>
        <tr>
            <td style="text-align: center;">A</td>
            <td><input type="number" min="150" max="450" name="temp_a1" value="190"></td>
        </tr>
        <tr>
            <td style="text-align: center;">First layer</td>
            <td><input type="number" min="150" max="450" name="temp_a0" value="200"></td>
        </tr>
    </tbody>
</table>`;

var pcReg = `<h4>Part Cooling Fan</h4>
<p>Printing with PLA typically has the part cooling fan come on from layer 2. Alter this default behaviour here. A zero speed value disables the fan apart from bridging.</p>
<label>Part cooling fan speed:</label> <input type="number" name="fanSpeed" value="100" min="0" max="100" step="5"> % </label><label for="fanLayer">starting on: </label>
<select name="fanLayer">
    <option value="2">layer 2</option>
    <option value="3">layer 3</option>
    <option value="5">layer 5</option>
</select>`;

var pcFirstlayer = `<h4>Part Cooling Fan</h4>
<p>Part cooling fans typically don't activate until at least layer 2. Since this print is only one layer thick, part cooling is not applicable.</p>`;

var abl = `<h4>Auto Bed Levelling</h4>
<label for="abl">Select which method of ABL is in place.</label>
<select name="abl">
    <option value="0">No ABL</option>
    <option value="1">Probe new mesh at the start of print - G29 (BLtouch,EZABL,etc)</option>
    <option value="2">Restore saved ABL/manual mesh - M420 S1</option>
    <option value="3">Prusa MK3 - G28 W followed by G80</option>
    <option value="4">Prusa Mini - Only heat nozzle to 170, then G29</option>
    <option value="5">Unified Bed Leveling - Load Saved Mesh (slot 0) then 3 Probe Tilt </option>
    <option value="6">Unified Bed Leveling - Load Saved Mesh (slot 1) then 3 Probe Tilt </option>
    <option value="7">Unified Bed Leveling - Load Saved Mesh (slot 2) then 3 Probe Tilt </option>
</select>`;

var retractionReg = `<h4>Retraction</h4>
<p>If you don't know what to enter here, you can leave the retraction speed at 40 mm/sec. For a bowden tube printer, 6mm is a likely retraction distance. For direct drive, a starting value of 1mm may be suitable. If you are not sure about extra restart distance, leave this as 0.</p>
<p><label>Retraction distance (mm): <input type="number" name="retdist" value="5" min="0" max="20" step="0.1"></label>
    <label>Retraction speed (mm/sec): <input type="number" name="retspeed" value="40" min="5" max="150" step="1"></label></p>
    <p><label>Extra restart distance (mm): <input type="number" name="retdistextra" min="-10" max="10" value="0" step="0.1"></label>
    <label>Z hop (mm): <input type="number" name="zhop" min="0" max="10" value="0" step="0.1"></label></p>`;

var retractionTower = `<h4>Retraction</h4>
<p>For initial tests, you can leave the retraction speed at 40 mm/sec. For a bowden tube printer, 6mm is a likely retraction distance. For direct drive, a starting value of 1mm may be suitable. Vary either side of this for each segment. <span class="sug">Suggested increments for how much to vary the value for each segment are shown in green.</span>.</p>
<table>
    <thead>
        <tr>
            <th>Reference Diagram</th>
            <th>Segment</th>
            <th>Retraction distance (mm)<p class="sug">&#177; 0.5 - 1</p></th>
            <th>Retraction speed (mm/sec)<p class="sug">&#177; 5</p></th>
            <th>Extra restart distance (mm)<p class="sug">&#177; 0.2</p></th>
            <th>Prime (unretract) speed (mm/sec)<p class="sug">&#177; 5</p></th>
            <th>Z hop (mm)<p class="sug">&#177; 0.1</p></th>
        </tr>
    </thead>
    <tbody>
         <tr>
            <td rowspan="6">
                <img src="img/retractiondiagram.jpg" />
            </td>
            <td style="text-align: center;">F</td>
            <td><input type="number" min="0" max="20" name="ret_f1" value="6" step="0.1"></td>
            <td><input type="number" min="5" max="200" name="ret_f2" value="40" step="1"></td>
            <td><input type="number" min="-10" max="10" name="ret_f3" value="0" step="0.1"></td>
            <td><input type="number" min="5" max="200" name="ret_f4" value="40" step="1"></td>
            <td><input type="number" min="0" max="5" name="ret_f5" value="0" step="0.1"></td>
        </tr>
        <tr>
            <td style="text-align: center;">E</td>
            <td><input type="number" min="0" max="20" name="ret_e1" value="6" step="0.1"></td>
            <td><input type="number" min="5" max="200" name="ret_e2" value="40" step="1"></td>
            <td><input type="number" min="-10" max="10" name="ret_e3" value="0" step="0.1"></td>
            <td><input type="number" min="5" max="200" name="ret_e4" value="40" step="1"></td>
            <td><input type="number" min="0" max="5" name="ret_e5" value="0" step="0.1"></td>
        </tr>
        <tr>
            <td style="text-align: center;">D</td>
            <td><input type="number" min="0" max="20" name="ret_d1" value="6" step="0.1"></td>
            <td><input type="number" min="5" max="200" name="ret_d2" value="40" step="1"></td>
            <td><input type="number" min="-10" max="10" name="ret_d3" value="0" step="0.1"></td>
            <td><input type="number" min="5" max="200" name="ret_d4" value="40" step="1"></td>
            <td><input type="number" min="0" max="5" name="ret_d5" value="0" step="0.1"></td>
        </tr>
        <tr>
            <td style="text-align: center;">C</td>
            <td><input type="number" min="0" max="20" name="ret_c1" value="6" step="0.1"></td>
            <td><input type="number" min="5" max="200" name="ret_c2" value="40" step="1"></td>
            <td><input type="number" min="-10" max="10" name="ret_c3" value="0" step="0.1"></td>
            <td><input type="number" min="5" max="200" name="ret_c4" value="40" step="1"></td>
            <td><input type="number" min="0" max="5" name="ret_c5" value="0" step="0.1"></td>
        </tr>
        <tr>
            <td style="text-align: center;">B</td>
            <td><input type="number" min="0" max="20" name="ret_b1" value="6" step="0.1"></td>
            <td><input type="number" min="5" max="200" name="ret_b2" value="40" step="1"></td>
            <td><input type="number" min="-10" max="10" name="ret_b3" value="0" step="0.1"></td>
            <td><input type="number" min="5" max="200" name="ret_b4" value="40" step="1"></td>
            <td><input type="number" min="0" max="5" name="ret_b5" value="0" step="0.1"></td>
        </tr>
        <tr>
            <td style="text-align: center;">A</td>
            <td><input type="number" min="0" max="20" name="ret_a1" value="6" step="0.1"></td>
            <td><input type="number" min="5" max="200" name="ret_a2" value="40" step="1"></td>
            <td><input type="number" min="-10" max="10" name="ret_a3" value="0" step="0.1"></td>
            <td><input type="number" min="5" max="200" name="ret_a4" value="40" step="1"></td>
            <td><input type="number" min="0" max="5" name="ret_a5" value="0" step="0.1"></td>
        </tr>
    </tbody>
</table>`;

var accel = `<h4>Base feedrate/speed</h4>
<p>You can specify the feedrate for X and Y movements. The inner perimeter will be set to this speed and the outer perimeter 50% of this speed.</p>
<label>Base feedrate (mm/sec): <input type="number" name="feedrate" value="60" min="20" max="500"></label>
<h4>Acceleration and jerk/junction deviation</h4>
<p>After entering <b>M503</b>, I have determined my 3D printer firmware uses:</p>
<label>Jerk: <input type="radio" value="jerk" name="jerk_or_jd" checked="checked" onchange="toggleJ()"></label>
<label>Junction deviation: <input type="radio" value="jd" name="jerk_or_jd" onchange="toggleJ()"></label>
<p>Based on the values you saw from <b>M503</b>, enter variables around this below.</p>
<p>Junction deviation requires a single value, whereas jerk has separate values for X and Y. You can leave them the same or enter independent values.</p>
<p>You should only change either acceleration or jerk/junction deviation for each test print, otherwise it will be impossible to know which parameter is responsible for any changes.</p>
<p><span class="sug">Suggested increments for how much to vary the value for each segment are shown in green.</span></p>
<table>
    <thead>
        <tr>
            <th>Reference diagram</th>
            <th>Segment</th>
            <th>Acceleration<p class="sug">&#177; 100 (moving bed i3)</p><p class="sug">&#177; 500 (coreXY / delta)</p></th>
            <th class="jerktd">Jerk X<p class="sug">&#177; 1</p></th>
            <th class="jerktd">Jerk Y<p class="sug">&#177; 1</p></th>
            <th class="jerktd">Jerk Z (delta only)<p class="sug">&#177; 1</p></th>
            <th class="jdtd">Junction deviation<p class="sug">&#177; 0.01 - 0.05</p></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="6" style="text-align: center;"><img src="img/accelerationdiagram.jpg" /></td>
            <td style="text-align: center;">F</td>
            <td><input type="number" name="accel_f1" value="500" min="10" max="50000" step="10"></td>
            <td class="jerktd"><input type="number" name="accel_f2" value="8" min="1" max="30" step="1"></td>
            <td class="jerktd"><input type="number" name="accel_f3" value="8" min="1" max="30" step="1"></td>
            <td class="jerktd"><input type="number" name="accel_f5" value="8" min="1" max="30" step="1"></td>
            <td class="jdtd"><input type="number" name="accel_f4" value="0.050" min="0.01" max="20" step="0.001"></td>
        </tr>
        <tr>
            <td style="text-align: center;">E</td>
            <td><input type="number" name="accel_e1" value="500" min="10" max="50000" step="10"></td>
            <td class="jerktd"><input type="number" name="accel_e2" value="8" min="1" max="30" step="1"></td>
            <td class="jerktd"><input type="number" name="accel_e3" value="8" min="1" max="30" step="1"></td>
            <td class="jerktd"><input type="number" name="accel_e5" value="8" min="1" max="30" step="1"></td>
            <td class="jdtd"><input type="number" name="accel_e4" value="0.050" min="0.01" max="20" step="0.001"></td>
        </tr>
        <tr>
            <td style="text-align: center;">D</td>
            <td><input type="number" name="accel_d1" value="500" min="10" max="50000" step="10"></td>
            <td class="jerktd"><input type="number" name="accel_d2" value="8" min="1" max="30" step="1"></td>
            <td class="jerktd"><input type="number" name="accel_d3" value="8" min="1" max="30" step="1"></td>
            <td class="jerktd"><input type="number" name="accel_d5" value="8" min="1" max="30" step="1"></td>
            <td class="jdtd"><input type="number" name="accel_d4" value="0.050" min="0.01" max="20" step="0.001"></td>
        </tr>
        <tr>
            <td style="text-align: center;">C</td>
            <td><input type="number" name="accel_c1" value="500" min="10" max="50000" step="10"></td>
            <td class="jerktd"><input type="number" name="accel_c2" value="8" min="1" max="30" step="1"></td>
            <td class="jerktd"><input type="number" name="accel_c3" value="8" min="1" max="30" step="1"></td>
            <td class="jerktd"><input type="number" name="accel_c5" value="8" min="1" max="30" step="1"></td>
            <td class="jdtd"><input type="number" name="accel_c4" value="0.050" min="0.01" max="20" step="0.001"></td>
        </tr>
        <tr>
            <td style="text-align: center;">B</td>
            <td><input type="number" name="accel_b1" value="500" min="10" max="50000" step="10"></td>
            <td class="jerktd"><input type="number" name="accel_b2" value="8" min="1" max="30" step="1"></td>
            <td class="jerktd"><input type="number" name="accel_b3" value="8" min="1" max="30" step="1"></td>
            <td class="jerktd"><input type="number" name="accel_b5" value="8" min="1" max="30" step="1"></td>
            <td class="jdtd"><input type="number" name="accel_b4" value="0.050" min="0.01" max="20" step="0.001"></td>>
        </tr>
        <tr>
            <td style="text-align: center;">A</td>
            <td><input type="number" name="accel_a1" value="500" min="10" max="50000" step="10"></td>
            <td class="jerktd"><input type="number" name="accel_a2" value="8" min="1" max="30" step="1"></td>
            <td class="jerktd"><input type="number" name="accel_a3" value="8" min="1" max="30" step="1"></td>
            <td class="jerktd"><input type="number" name="accel_a5" value="8" min="1" max="30" step="1"></td>
            <td class="jdtd"><input type="number" name="accel_a4" value="0.050" min="0.01" max="20" step="0.001"></td>
        </tr>
    </tbody>
</table>`;

var endGcode = `<h4>Additional end gcode</h4>
<p>If you have additional end commands, tick the box and enter the gcode.</p>
<label>Additional end gcode:<input name="end" type="checkbox" onchange="displayCustom();" value="extraEnd"></label>
<div class="endExp">
    <p>For the majority of users, you can skip this section. Any gcode entered here will be inserted at the very end of the file.</p>
    <textarea name="endgcode"></textarea>
</div>`;

function createForm(n){
    document.write('<input type="hidden" name="description" value="'+n+'">')
    document.write(nozzleLayer);
    document.write(startGcode);
    document.write(abl);
    document.write(bedDims);
    if(n == "firstlayer"){
        document.write(extraMargin);
    }
    if(n == "temperature"){
        document.write(tempTower)
    } else {
        document.write(tempReg)
    }
    if(n == "firstlayer"){
        document.write(pcFirstlayer);
    } else {
        document.write(pcReg);
    }
    if(n == "retraction"){
        document.write(retractionTower);
    } else {
        document.write(retractionReg);
    }
    if(n == "acceleration"){
        document.write(accel);
    }
    document.write(endGcode);
    
}            
            