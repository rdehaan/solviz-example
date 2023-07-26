// This file is released under the MIT license.
// See LICENSE.md.

lit_to_atom = {};
model_found = false;

var log = "";
var logElement = document.getElementById('log');

function get_atom_from_lit(lit) {
  if (lit > 0) {
    atom = lit_to_atom[lit];
  }
  else {
    atom = "-" + lit_to_atom[-lit];
  }
  return atom;
}

function interface_register_watch(lit, atom) {
  lit_to_atom[lit] = atom;
  addToLog("Interface: registered watch " + atom + " (literal: " + lit + ")");
}
function interface_propagate(lit, atom) {
  atom = get_atom_from_lit(lit);
  addToLog("Interface: propagate " + atom + " (literal: " + lit + ")");
}
function interface_undo(lit, atom) {
  if (!need_to_update_graphics()) {
    return;
  }
  atom = get_atom_from_lit(lit);
  addToLog("Interface: undo " + atom + " (literal: " + lit + ")");
}
function interface_decide(lit) {
  atom = get_atom_from_lit(lit);
  addToLog("Interface: decide " + atom + " (literal: " + lit + ")");
}
function interface_check(model) {
  atoms = Array();
  for (let index = 0; index < model.length; ++index) {
    atom = get_atom_from_lit(model[index]);
    if (atom != null) {
      atoms.push(atom);
    }
  }
  addToLog("Interface: model: " + atoms);
  updateOutput();
  model_found = true;
  if (need_to_update_graphics() && document.getElementById("pause-on-model").checked) {
    do_pause();
  }
}
function interface_on_model() {
}
function watched_predicates() {
  return "*";
}
function interface_start() {
  addToLog("Interface: start");
  document.getElementById("run").disabled = true;
  document.getElementById("pause").disabled = false;
  do_resume();
}
function interface_finish() {
  addToLog("Interface: finish");
  document.getElementById("run").disabled = false;
  document.getElementById("pause").disabled = true;
  document.getElementById("resume").disabled = true;
  updateOutput();
  speed_factor = document.getElementById("speed").value;
  setTimeout(function() {
    updateOutput();
  }, speed_factor*500);
  setTimeout(function() {
    updateOutput();
  }, speed_factor*1000);
}
function interface_wait_time_propagate() {
  if (!need_to_update_graphics()) {
    return 0;
  }
  speed_factor = document.getElementById("speed").value;
  return speed_factor*1000;
}
function interface_wait_time_undo() {
  if (!need_to_update_graphics()) {
    return 0;
  }
  speed_factor = document.getElementById("speed").value;
  return speed_factor*1000;
}
function interface_wait_time_check() {
  if (!need_to_update_graphics()) {
    return 0;
  }
  speed_factor = document.getElementById("speed").value;
  return speed_factor*2000;
}
function interface_wait_time_on_model() {
  if (!need_to_update_graphics()) {
    return 0;
  }
  speed_factor = document.getElementById("speed").value;
  return speed_factor*0;
}
function interface_wait_time_decide() {
  if (!need_to_update_graphics()) {
    return 0;
  }
  speed_factor = document.getElementById("speed").value;
  return speed_factor*500;
}

Module.can_resume = true;
function do_pause() {
  document.getElementById("pause").disabled = true;
  document.getElementById("resume").disabled = false;
  Module.can_resume = false;
}
function do_resume() {
  document.getElementById("pause").disabled = false;
  document.getElementById("resume").disabled = true;
  Module.can_resume = true;
}

function need_to_update_graphics() {
  var index = document.getElementById("mode").selectedIndex;
  if (index == 0 && model_found == true) {
    return false;
  }
  return true;
}

function clearLog() {
  log = "";
  updateLog();
}

function addToLog(text) {
  log = text + "\n" + log;
  updateLog();
}

function updateLog() {
  if (logElement) {
    logElement.textContent = log;
    // logElement.scrollTop = logElement.scrollHeight; // focus on bottom
  }
}


clearLog();
addToLog("Ready...");
