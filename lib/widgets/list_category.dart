import 'package:flutter/material.dart';
import 'package:icons_helper/icons_helper.dart';
import 'package:navigate/navigate.dart';

class ListCategory extends StatelessWidget {
    final dynamic category;
    ListCategory(this.category);

    int itemsInCategory(dynamic category) {
        List items = category['items'];
        return items == null
            ? 1
            : items.fold<int>(0, (int acc, dynamic item) => acc + itemsInCategory(item));
    }

    @override
    Widget build(BuildContext context) => ListTile(
        dense: true,
        contentPadding: EdgeInsets.all(0),
        leading: category['icon'] != null ?
            Icon(
                getIconGuessFavorFA(name: category['icon']),
                color: category['iconColor'] != null ? Color(int.parse('0xff${'FF0000'}')): Colors.blueGrey[200],
            )
            : null,
        title: Container(
            child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                    Text(
                        category['title'],
                        style: TextStyle(fontSize: 15),
                    ),
                    Expanded(child: Text('')),
                    Text(
                        '${itemsInCategory(category)}',
                        style: TextStyle(color: Colors.grey),
                    ),
                    Icon(Icons.chevron_right, color: Colors.grey,),
                ],
            ),
            decoration: new BoxDecoration(
                border: Border(bottom: BorderSide(color: Colors.grey[350])),
            ),
            height: 35.0,
        ),
        onTap: () => Navigate.navigate(context, '/category', arg: {'category': category}),
    );
}
