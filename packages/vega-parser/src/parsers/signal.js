export default function(signal, scope) {
  var op = scope.addSignal(signal.name, signal.value);
  if (signal.react === false) op.react = false;
}
