import { useToast } from 'native-base';

function showToast( title, description, status) {
  return (
    useToast.show({
      title,
      description,
      status,
      placement: 'top-right'
    })
  );
}

export default {
  showToast
};
