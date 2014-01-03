define('parsley/constraintFactory', [
  'parsley/utils'
], function (ParsleyUtils) {
  return ConstraintFactory = function (parsleyField, name, requirements, priority) {

    if ('ParsleyField' !== ParsleyUtils.get(parsleyField, '__class__'))
      throw new Error('ParsleyField instance expected');

    if ('function' !== typeof parsleyField.Validator.validators[name] &&
      'Assert' !== parsleyField.Validator.validators[name]().__parentClass__)
      throw new Error('Valid validator expected');

    var getPriority = function (parsleyField, name) {
      if ('undefined' !== typeof parsleyField.options[name + 'Priority'])
        return parsleyField.options[name + 'Priority'];

      return ParsleyUtils.get(parsleyField.Validator.validators[name](), 'priority', 2);
    };

    priority = priority || getPriority(parsleyField, name);

    return $.extend(parsleyField.Validator.validators[name](requirements), {
      name: name,
      requirements: requirements,
      priority: priority,
      groups: [priority],
      isDomConstraint: ParsleyUtils.attr(parsleyField.$element, parsleyField.options.namespace, name)
    });
  };
});
