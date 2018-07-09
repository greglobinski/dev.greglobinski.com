---
title: What is YAML and how to use it
relatesTo: ['gatsby-starter-hero-blog']
category: textbook
cover: what-is-yaml.png
---

In the [How to customize the HeroBlog starter's appearance](/customize-hero-blog-starter/) post I described how the starter uses a `theme.yaml` file to store data for the starter's theme object.

This basic overview is for you if you are not familiar with a `yaml` file type yet.

## What's YAML?

**YAML** is a human friendly data serialization standard for programming languages, designed to be writable and readable by humans.

The simplest `yaml` file could look like this.

```yaml
key: value
```

That's a key-value pair. Our entire document is a root object.

## Comments

Comments in YAML look like this.

```yaml
# that is a comment
key: value
# that is a comment also
```

## More simple examples

All types of formating are allowed with keys: camelCase, PascalCase, snake_case, kebab-case.

```yaml
numericValue: 23
ScientificNotation: 1e+9
boolean_value: true
null-value: null
```

String values don't need to be quoted.

```yaml
longStringValue: That is a long string value
```

But they can.

```yaml
anotherLongStringValue: 'That is a long string value'
andAnotherOne: "That is another one long string value"
```

Keys also could have spaces and do not need to be quoted but they can. That's allowed syntax.

```yaml
a valid key: value
'another valid key': value
```

## Assigning values

We can assign value as we did before

```yaml
key: value
```

or using nesting, note the indentation (2 spaces before `value`)

```yaml
key:
  value
```

Both syntaxes converted to `JSON` give the same result.

```json
{
  "key": "value"
}
```

But that's only because of simple type of the `value`.

## Nesting

Indentation in `yaml` means nesting one object inside another.

```yaml
key1: innerKey: value
key2:
  innerKey: value
```

These two syntaxes do not convert to the same JSON as before.

```json
{
  "key1": "innerKey: value",
  "key2": {
    "innerKey": "value"
  }
}
```

The first syntax treats everything after `:` as a string and assigns it to the `key`, the second one, with new line and indentation, creates inner object and assigns it to the `key2`.

Take a look at the HeroBlog starter's [theme](/customize-hero-blog-starter/) and notice how it uses indentation to build structure of multi-leveled nested objects.

## Multiple-line string values

There are two types of multiple-line string values: `literal_block` and `folded_style`

**literal_block**

```yaml
literal_block: |
  This is the first line of the literal_block
  This is the second line of the same literal_block

    And that's the third line of the literal_block.
another_key: value
```

With `|`, all three lines will be the value of the `literal_block` key, with every line breaks, blank line and additional indentation (besides the leading one) preserved. The literal continues until the leading indentation exist. The `another_key` clears the leading indetation of the `literal_block` value.

It will be converted to JSON like this

```json
{
  "literal_block":
    "This is the first line of the literal_block\nThis is the second line of the same literal_block\n\n  And that's the third line of the literal_block.\n",
  "another_key": "value"
}
```

**folded_style**

```yaml
folded_style: >
  This is the first line of the literal_block
  This is the second line of the same literal_block

    That's the third line
    And that's the fourth line
another_key: value  
```

As with `literal_block`, all three lines will be the value of `folded_style`. However, all newlines will be replaced with a single space and all blank lines will be converted to a newline character. But that concerns only lines without additional indentation. More indented lines will preserve its newline characters.

Take a look at how the `folded_style` converts to `JSON`.

```json
{
  "folded_style":
    "This is the first line of the literal_block This is the second line of the same literal_block\n  That's the third line\n  And that's the fourth line\n",
  "another_key": "value"
}
```

## Sequences

A sequence in YAML is an equivalent to `array` in JS.

```yaml
sequence:
  - "A"
  - 0.5
  - "B"
  - true
  - false
  - key: value
```

That converts to JSON like this

```json
{
  "sequence": [
    "A",
    0.5,
    "B",
    true,
    false,
    {
      "key": "value"
    }
  ]
}
```

We can nest one sequence into another one.

```yaml
a_sequence:
  - a
  - b
  -
    - c
    -
      - d
      - e
```

That converts to

```json
{
  "equence": ["a", "b", ["c", ["d", "e"]]]
}
```

## Anchors

Anchors let you easily reuse values across your document.

```yaml
keyOne: &anchor_name This is anchored value
keyTwo: *anchor_name
```

Thanks to `&anchor_name` the value of `keyOne` can be reassign to another key. Every time you change value of `keyOne`, the value of `keyTwo` will be updated automatically.

Take a look at the HeroBlog starter's [theme](/customize-hero-blog-starter/) and notice how it uses anchors to assign values of the options to the tokens.

## Summary

That's all what you need to comfortably edit the HeroBlog starter's [theme](/customize-hero-blog-starter/), but it is not everything about YAML features. There are much more, for example, it has tags, which let you explicitly declare types of values.

I strongly encourage you to play with the converters: JSON to YAML and JAML to JSON. Liks below.

## Links

* [yaml.org](http://yaml.org/)
* [wikipedia.org/wiki/YAML](https://en.wikipedia.org/wiki/YAML)
* [js-yaml](https://github.com/nodeca/js-yaml)
* [YAML validator](http://www.yamllint.com/)
* [YAML to JSON converter](http://convertjson.com/yaml-to-json.htm)
* [JSON to YAML converter](http://convertjson.com/json-to-yaml.htm)
