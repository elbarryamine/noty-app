import {Button, Pressable} from './button';
import {FormControlLabel} from './form';
import {Input, TextArea} from './input';
import {Select} from './select';
import {Skeleton, SkeletonText} from './skeleton';
import {Heading, Text} from './typography';

const components = {
  Select,
  Pressable,
  Button,
  Input,
  TextArea,
  Heading,
  Text,
  FormControlLabel,
  Spinner: {defaultProps: {color: 'primary-color'}},
  Skeleton,
  SkeletonText,
};

export default components;
