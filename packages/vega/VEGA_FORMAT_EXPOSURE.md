# Vega Format Exposure Verification

## Summary

**YES**, vega-format functions **ARE** exposed on the global `vega` object when loaded via CDN/script tag.

## Exposed Functions

The following vega-format functions are available on the global `vega` object:

### Number Format Functions
- **`vega.formatLocale(definition)`** - Creates a custom number format locale
  - Exported from `vega-format` as `numberFormatDefaultLocale`
  - Returns an object with a `format` method for creating number formatters

### Time Format Functions  
- **`vega.timeFormatLocale(definition)`** - Creates a custom time format locale
  - Exported from `vega-format` as `timeFormatDefaultLocale`
  - Returns an object with `timeFormat`, `utcFormat`, `timeParse`, and `utcParse` methods

### Combined Locale Functions
- **`vega.locale(definition)`** - Creates a combined number and time format locale
  - Accepts an object with `number` and `time` properties
  - Returns an object with both number and time formatting methods

### Default Locale Management
- **`vega.defaultLocale()`** - Gets the current default locale
- **`vega.resetDefaultLocale()`** - Resets to the default locale

## Verification

This was verified by:

1. **Code inspection**: Examining `/packages/vega/index.js` which explicitly exports these functions:
   ```javascript
   export {
     numberFormatDefaultLocale as formatLocale,
     timeFormatDefaultLocale as timeFormatLocale,
     locale,
     defaultLocale,
     resetDefaultLocale
   } from 'vega-format';
   ```

2. **Build verification**: Confirming the UMD bundle (`build/vega.js`) includes these exports:
   ```javascript
   exports.formatLocale = numberFormatDefaultLocale;
   exports.timeFormatLocale = timeFormatDefaultLocale;
   exports.locale = locale;
   exports.defaultLocale = defaultLocale;
   exports.resetDefaultLocale = resetDefaultLocale;
   ```

3. **Runtime testing**: Creating and running a comprehensive HTML test page that:
   - Loads vega via script tag (simulating CDN usage)
   - Verifies all functions are defined and callable
   - Tests that each function returns the expected object type
   - Confirms the functions work correctly with sample locale definitions

## Test Location

A comprehensive test page is available at:
- `/packages/vega/test/web/vega-format-test.html`

To run the test:
1. Build the vega package: `npm run build`
2. Start a local web server in the vega package directory
3. Open `test/web/vega-format-test.html` in a browser

## Example Usage

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/vega@6/build/vega.min.js"></script>
</head>
<body>
  <script>
    // Create a custom number format locale (French)
    const frenchNumberLocale = vega.formatLocale({
      decimal: ',',
      thousands: '\u00a0',
      grouping: [3],
      currency: ['', '\u00a0€']
    });
    
    const formatter = frenchNumberLocale.format('$,.2f');
    console.log(formatter(1234.56)); // "1 234,56 €"
    
    // Create a custom time format locale (Russian)
    const russianTimeLocale = vega.timeFormatLocale({
      dateTime: '%A, %e %B %Y г. %X',
      date: '%d.%m.%Y',
      time: '%H:%M:%S',
      periods: ['AM', 'PM'],
      days: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
      shortDays: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
      months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
      shortMonths: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
    });
    
    const timeFormatter = russianTimeLocale.timeFormat('%A, %e %B');
    console.log(timeFormatter(new Date())); // e.g., "понедельник, 15 декабря"
  </script>
</body>
</html>
```

## Conclusion

All vega-format locale management functions are properly exposed on the global `vega` object and are fully functional when vega is loaded via CDN or script tag.
