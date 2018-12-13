import 'package:flutter/material.dart';

import 'package:paulvanbike/widgets/list_category.dart';
import 'package:paulvanbike/widgets/list_item.dart';


class List extends StatelessWidget {
    final dynamic items;
    List(this.items);

    @override
    Widget build(BuildContext context) => Expanded(
        child: ListView.builder(
            itemCount: items.length,
            itemBuilder: (BuildContext context, int i) {
                if(items[i]['items'] != null) return ListCategory(items[i]);
                else return ListItem(items[i]);
            },
            padding: EdgeInsets.only(left: 30, right: 25, top: 15),
        ),
    );
}
